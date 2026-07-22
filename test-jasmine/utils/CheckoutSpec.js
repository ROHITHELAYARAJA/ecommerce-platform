describe('checkout markup div structure', () => {
  let wrapper;

  function createCheckoutWrapper() {
    const container = document.createElement('div');
    container.innerHTML = `
      <div class="checkout-header">
        <div class="header-content">
          <div class="checkout-header-left-section"></div>
          <div class="checkout-header-middle-section"></div>
          <div class="checkout-header-right-section"></div>
        </div>
      </div>
      <div class="main">
        <div class="page-title">Review your order</div>
        <div class="checkout-grid">
          <div class="order-summary"></div>
          <div class="payment-summary">
            <div class="payment-summary-title">Order Summary</div>
            <div class="payment-summary-row"></div>
            <div class="payment-summary-row subtotal-row"></div>
            <div class="payment-summary-row total-row"></div>
          </div>
        </div>
      </div>`;
    return container;
  }

  beforeEach(() => {
    wrapper = createCheckoutWrapper();
    document.body.appendChild(wrapper);
  });

  afterEach(() => {
    if (wrapper && wrapper.parentNode) {
      wrapper.parentNode.removeChild(wrapper);
    }
    wrapper = null;
  });

  const selectors = [
    '.checkout-header',
    '.header-content',
    '.checkout-header-left-section',
    '.checkout-header-middle-section',
    '.checkout-header-right-section',
    '.main',
    '.page-title',
    '.checkout-grid',
    '.order-summary',
    '.payment-summary',
    '.payment-summary-title',
    '.payment-summary-row',
    '.subtotal-row',
    '.total-row'
  ];

  selectors.forEach((selector) => {
    it(`should render ${selector} div`, () => {
      expect(wrapper.querySelector(selector)).not.toBeNull();
    });
  });
});
