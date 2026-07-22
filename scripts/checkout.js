import { cart, DeleteId} from "../data/cart.js";
import { products,getProduct } from "../data/products.js";
import {MoneyConverter} from './utils/moneyUtil.js'
import {deliveryOption} from '../data/deleivery-Option.js'

import {payment} from './Summary/payment.js'

//payment();

const today = new Date();
const TAX_RATE = 0.1;

export function renderCheckout() {
  let checkoutHTML = '';
  let itemCount = 0;
  let itemsTotalCents = 0;

  cart.forEach((item) => {
    const productId = item.productId;
    const productQuantity = item.productQuantity;
    const matchingProduct = getProduct(productId);

    if (!matchingProduct) {
      return;
    }

    itemCount += productQuantity;
    itemsTotalCents += matchingProduct.priceCents * productQuantity;

    const defaultOption = deliveryOption[0];
    const deliveryDate = new Date();
    deliveryDate.setDate(today.getDate() + defaultOption.days);
    const deliveryDateString = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });

    checkoutHTML += `
      <div class="cart-item-container js-card-item-${matchingProduct.id} js-order-summary">
        <div class="delivery-date">
          Delivery date: ${deliveryDateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${MoneyConverter(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity js-product-Quantity${matchingProduct.id}">
              <span>
                Quantity: <span class="quantity-label">${productQuantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-button"
                data-product-id="${matchingProduct.id}  js-delete-product-id"${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            ${Delivery(matchingProduct)}
          </div>
        </div>
      </div>`;
  });

  function Delivery(matchingProduct) {
    let html = '';

    deliveryOption.forEach((option, index) => {
      const deliveryDate = new Date();
      deliveryDate.setDate(today.getDate() + option.days);
      const deliveryDateString = deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      const priceString = option.price === 0 ? 'Free' : `$${MoneyConverter(option.price)} -`;
      const checked = index === 0 ? 'checked' : '';

      html += `
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}"
            value="${option.id}"
            data-days="${option.days}"
            data-price="${option.price}"
            ${checked}>
          <div>
            <div class="delivery-option-date">${deliveryDateString}</div>
            <div class="delivery-option-price">${priceString}</div>
          </div>
        </div>
      `;
    });

    return html;
  }

 // document.querySelector('.order-summary').innerHTML = checkoutHTML;
 // updateOrderSummary(itemCount, itemsTotalCents, calculateSelectedShipping());
const orderSummaryEl = document.querySelector('.order-summary');
if (orderSummaryEl) {
  orderSummaryEl.innerHTML = checkoutHTML;
}
updateOrderSummary(itemCount, itemsTotalCents, calculateSelectedShipping());
  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      DeleteId(productId);
      renderCheckout();
    });
  });

  document.querySelectorAll('.delivery-option-input').forEach((input) => {
    input.addEventListener('change', () => {
      if (!input.checked) return;

      const cartItem = input.closest('.cart-item-container');
      const dateLabel = cartItem.querySelector('.delivery-date');
      const days = Number(input.dataset.days);
      const selectedDate = new Date();
      selectedDate.setDate(today.getDate() + days);
      const selectedDateString = selectedDate.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
      });
      dateLabel.textContent = `Delivery date: ${selectedDateString}`;
      updateOrderSummary(itemCount, itemsTotalCents, calculateSelectedShipping());
    });
  });

  function calculateSelectedShipping() {
    let shippingCents = 0;
    document.querySelectorAll('.delivery-option-input:checked').forEach((input) => {
      shippingCents += Number(input.dataset.price || 0);
    });
    return shippingCents;
  }

  function updateOrderSummary(itemCount, itemsTotalCents, shippingCents) {
    const subtotalCents = itemsTotalCents + shippingCents;
    const taxCents = Math.round(subtotalCents * TAX_RATE);
    const orderTotalCents = subtotalCents + taxCents;

    const itemsCountEl = document.getElementById('items-count');
    const itemsTotalEl = document.getElementById('items-total');
    const shippingTotalEl = document.getElementById('shipping-total');
    const subtotalTotalEl = document.getElementById('subtotal-total');
    const taxTotalEl = document.getElementById('tax-total');
    const orderTotalEl = document.getElementById('order-total');

    if (itemsCountEl) itemsCountEl.textContent = itemCount;
    if (itemsTotalEl) itemsTotalEl.textContent = `$${MoneyConverter(itemsTotalCents)}`;
    if (shippingTotalEl) shippingTotalEl.textContent = `$${MoneyConverter(shippingCents)}`;
    if (subtotalTotalEl) subtotalTotalEl.textContent = `$${MoneyConverter(subtotalCents)}`;
    if (taxTotalEl) taxTotalEl.textContent = `$${MoneyConverter(taxCents)}`;
    if (orderTotalEl) orderTotalEl.textContent = `$${MoneyConverter(orderTotalCents)}`;
  }
}

renderCheckout();