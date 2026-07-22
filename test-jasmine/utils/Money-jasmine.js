import {MoneyConverter} from '../../scripts/utils/moneyUtil.js'

describe("test suite : formatCurrency",()=>{
  it('coverts cents into dollar',()=>{
    expect(MoneyConverter(2095)).toEqual('20.95');
  })
})