# OData Pretty Print
[![codecov](https://codecov.io/gh/sinnaj-r/odata-pretty-print/branch/main/graph/badge.svg?token=HzL4zyPvzL)](https://codecov.io/gh/sinnaj-r/odata-pretty-print)


Pretty print OData Request-URLs.

## Install

Install from the NPM repository using yarn or npm:

```shell
yarn add odata-pretty-print
```

```shell
npm install odata-pretty-print
```

## Example Usage

```js
import { format, print } from 'odata-pretty-print';
//...
const url =
  '$expand=field1($expand=field2($expand=field3;$select=a,b,c);$select=d,e,f)';
const formattedString = format(url);
// OR:
print(url);
```

_Will output something like this_

```

$expand=field1(
  $expand=field2(
    $expand=field3;
    $select=a,b,c
  );
  $select=d,e,f
)
```
