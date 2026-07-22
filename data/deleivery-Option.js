export const deliveryOption = [{
  id:'1',
  days:7,
  price:0
} , 
{
    id:'2',
 days:3,
 price: 499
},{
  id:'3',
  days:1,
  price : 999
}
]



export function DeliveryOption(deliveryOptId){

  let deliveryOpt;

  deliveryOption.forEach((option)=>{
    if(option.id==deliveryOptId){
      deliveryOpt = option;
    }
  })
  return deliveryOpt || deliveryOption[0];
  
}