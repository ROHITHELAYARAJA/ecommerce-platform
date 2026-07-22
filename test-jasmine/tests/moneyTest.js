import {MoneyConverter} from '../scripts/utils/moneyUtil.js'


console.log("test suite : formatCurrency");

console.log("coverts cents into dollar");
if(MoneyConverter(2095)=="20.95"){
  console.log("passed");
}
else{
  console.log("failed");
}

console.log("work with zero");

if(MoneyConverter(0.5)=="0.05"){
  console.log("passed");
}
else{
  console.log("failed");
}


console.log("coverts the 2000 to nearest round ");

if(MoneyConverter(2000.5)=="20.01"){
  console.log("passed");
}
else{
  console.log("failed");
}
