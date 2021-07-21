import { expect } from 'chai';
import 'mocha-sinon';
import { format, print } from '../src';

describe('OData Pretty Print', () => {
  beforeEach(function () {
    this.sinon.stub(console, 'log');
  });
  it('can handle part of url', () => {
    expect(
      format('$expand=test($select=field1,field2,field3;$expand=*)'),
    ).to.equal(
      '\n$expand=test(\n  $select=field1,field2,field3;\n  $expand=*\n)\n',
    );
  });
  it('can handle full url', () => {
    expect(
      format(
        "http://example.com/test/entity(id='1234')?$select=field1,field2,field3",
      ),
    ).to.equal(
      "http://example.com/test/entity(\n  id='1234'\n)?\n$select=field1,field2,field3",
    );
  });
  it('can format deep query', () => {
    expect(
      format(
        "http://example.com/test/entity(id='1234')?$expand=field1($expand=field2($expand=field3))",
      ),
    ).to.equal(
      "http://example.com/test/entity(\n  id='1234'\n)?\n$expand=field1(\n  $expand=field2(\n    $expand=field3\n  )\n)\n",
    );
  });
  it('can format long filter', () => {
    expect(
      format(
        "$filter=(field1 eq 'foo' and field2 eq 'bar' and field3 eq 'foobar')",
      ),
    ).to.equal(
      "\n$filter=(\n  field1 eq 'foo' and field2 eq 'bar' and field3\n  eq 'foobar'\n)\n",
    );
  });
  it('can format complex query', () => {
    expect(
      format(
        "/browse/BUT000(partner='1234')?$select=partner,type,name_org1,name_org2,name_org3,name_org4&" +
          '$expand=contactLink($expand=contacts($select=name1,name2,name3,name4,street,' +
          'house_num1,city1,city2,post_code1;$expand=phoneNumbers($select=tel_number,' +
          'tel_extens),faxNumbers($select=fax_number,fax_extens))),partners($select=guid' +
          ',partner_fct;$expand=link($expand=orderDocument($select=guid,description,object_type' +
          ',process_type;$expand=activityHeader($select=category),opportunityHeader($select=' +
          'curr_phase,startdate,expect_end,exp_revenue,budget_bp,sys_probability,probability))))',
      ),
    ).to.equal(
      "/browse/BUT000(\n  partner='1234'\n)?\n$select=partner,type,name_org1,name_org2,name_org3,\nname_org4&\n$expand=contactLink(\n  $expand=contacts(\n    $select=name1,name2,name3,name4,street,house_num1,\n    city1,city2,post_code1;\n    $expand=phoneNumbers(\n      $select=tel_number,tel_extens\n    )\n    ,faxNumbers(\n      $select=fax_number,fax_extens\n    )\n  )\n)\n,partners(\n  $select=guid,partner_fct;\n  $expand=link(\n    $expand=orderDocument(\n      $select=guid,description,object_type,process_type;\n      $expand=activityHeader(\n        $select=category\n      )\n      ,opportunityHeader(\n        $select=curr_phase,startdate,expect_end,exp_revenue,\n        budget_bp,sys_probability,probability\n      )\n    )\n  )\n)\n",
    );
  });
  it('print to console', () => {
    print('$expand=test($select=field1,field2,field3;$expand=*)'),
      expect(
        (console.log as any).calledWith(
          '\n$expand=test(\n  $select=field1,field2,field3;\n  $expand=*\n)\n',
        ),
      ).to.be.true;
  });
});
