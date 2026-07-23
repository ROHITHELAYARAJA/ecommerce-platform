class Dummy{
  dummy = undefined;
}

class Cart{
  cartItem;
  area ;

  constructor(area){
    this.#area = area;
    this.#loadFromStorage();
    console.log(this);


  }
  #loadFromStorage(){
   this.cartItem = JSON.parse(localStorage.getItem(this.#area)) || [
    {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    productQuantity: 1,
    id:'1'
  },
  {
    productId:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
    productQuantity: 2  ,
    id:'2'
  }
];

}
  saveStorage(){
  localStorage.setItem(this.#area,JSON.stringify(this.cartItem));
  }

  addToCart(pId) {
   let matchingItem;

    this.cartItem.forEach((item) => {
      if (item.productId === pId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.productQuantity++;
    } else {
        this.cartItem.push({
        productId: pId,
        productQuantity: 1,
        id:'1'
      });
    }
    // persist changes so other pages (checkout) see the update
      this.saveStorage();

      
}
cartQuantityUpdate() {
  
    let cartQuantity = 0;
    this.cartItem.forEach((item)=>{
      cartQuantity += item.productQuantity;
    })

    document.querySelector('.js-cartItem-quantity').innerHTML = cartQuantity;
    console.log(cartQuantity);
  }
DeleteId(productId) {
   this.cartItem =  this.cartItem.filter((item) => item.productId !== productId);
   this.saveStorage();
}
  

}
  



const cart =new Cart('cart');
const businessCart = new Cart('business');



console.log(businessCart instanceof Cart);
console.log(businessCart instanceof Dummy);


