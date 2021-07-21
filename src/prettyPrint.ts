/* eslint-disable no-useless-concat */
/* eslint-disable no-plusplus */
/* eslint-disable no-cond-assign */
/* eslint-disable no-multi-assign */

export const format = (t: string, maxWidth = 40) => {
  let indentation = 0;
  let content = '';
  let charIndex;
  let currChar;
  let result = '';
  let charsSinceLastBreak = 0;
  const pad = (extra: boolean = false) =>
    ''.padStart(indentation, ' ') + (extra ? ' ' : '');

  // Iterate over Characters
  for (charIndex = 0; (currChar = t[charIndex++]); ) {
    // Indent after opening parenthesis
    if (currChar === '(') {
      indentation += 2;
      result += content;
      content = `${'(' + '\n'}${pad()}`;
      charsSinceLastBreak = 0;
    }
    // Unindent after closing parenthesis
    else if (currChar === ')') {
      indentation -= 2;
      // Check if already indented
      if (content.match(/\n *$/)) {
        content = content.trim();
      }
      content += `\n${pad()})\n${pad()}`;

      charsSinceLastBreak = 0;
    }
    // Linebreak after '$'
    else if (currChar === '$' && !content.trimEnd().endsWith('(')) {
      content = `${content.trimEnd()}\n${pad()}$`;
      charsSinceLastBreak = 0;
    }
    // Linebreak after '?'
    else if (currChar === '?') {
      content = `${content.trimEnd()}?\n${pad()}`;
      charsSinceLastBreak = 0;
    }
    // Linebreak after ',' (if needed)
    else if (currChar === ',' && charsSinceLastBreak >= maxWidth) {
      content = `${content.trimEnd()},\n${pad()}`;
      charsSinceLastBreak = 0;
    }
    // Linebreak after ';'
    else if (currChar === ';') {
      content = `${content.trimEnd()};\n${pad()}`;
      charsSinceLastBreak = 0;
    }
    // Linebreak after ' ' (if needed)
    else if (currChar === ' ' && charsSinceLastBreak >= maxWidth) {
      content += `\n${pad()}`;
      charsSinceLastBreak = 0;
    }
    // Just 'normal' text
    else {
      content += currChar;
      charsSinceLastBreak++;
    }
  }
  return result + content;
};

export const print = (request: string, maxWidth = 40) => {
  // eslint-disable-next-line no-console
  console.log(format(request, maxWidth));
};
