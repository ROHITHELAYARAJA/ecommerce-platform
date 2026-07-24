import { cart,addToCart,cartQuantityUpdate   } from '../data/cart.js';
import { products } from '../data/products.js';

import {MoneyConverter} from './utils/moneyUtil.js'

let productsHTML = "";

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">

      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${(product.getProductUrl())}">

        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${product.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
      </div>
      
      ${product.extraInfoHtml()}

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add" data-product-id="${product.id}" > 
        Add to Cart
      </button>

    </div>
  `;
});


document.querySelector(".products-grid").innerHTML = productsHTML;
// update cart quantity UI from persisted cart on page load
cartQuantityUpdate();
document.querySelectorAll(".js-add").forEach((button) => {
  button.addEventListener("click", () => {

    console.log("Clicked");

    const productId = button.dataset.productId;
    console.log(productId);
    addToCart(productId);

       const container = 
 

   
    cartQuantityUpdate();
    console.log(cart);
  });
});