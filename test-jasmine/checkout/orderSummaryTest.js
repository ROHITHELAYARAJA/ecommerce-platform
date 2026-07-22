import { renderCheckout } from '../../scripts/checkout.js';
import { loadFromStorage } from '../../data/cart.js';

describe("Integration testing for checkout.js", () => {

  beforeEach(() => {

    document.querySelector(".js-test-container").innerHTML = `
      <div class="order-summary"></div>

      <span id="items-count"></span>
      <span id="items-total"></span>
      <span id="shipping-total"></span>
      <span id="subtotal-total"></span>
      <span id="tax-total"></span>
      <span id="order-total"></span>
    `;
  });

  it("display the cart", () => {

    spyOn(localStorage, "getItem").and.returnValue(JSON.stringify([
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        productQuantity: 1,
        id: "1"
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        productQuantity: 2,
        id: "2"
      }
    ]));

    loadFromStorage();   // loads that fake cart data into your `cart` array
    renderCheckout();    // builds HTML — one .cart-item-container div per cart entry

    expect(document.querySelectorAll(".cart-item-container").length).toBe(2);
  });

});