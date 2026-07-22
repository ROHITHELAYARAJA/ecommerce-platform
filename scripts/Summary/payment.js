import {cart} from '../../data/cart.js'
import { getProduct } from "../../data/products.js";

  let productCents = 0;
export function payment(){


  cart.forEach((cartItem)=>{
    let product = getProduct(cartItem.productId);

    productCents+=product.priceCents+cartItem.productQuantity;

  })

  console.log(productCents);
}