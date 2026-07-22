// Mock cart for testing purposes
export const mockCart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    productQuantity: 1,
    id: '1'
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    productQuantity: 2,
    id: '2'
  },
  {
    productId: '83d629dc-0de0-4cabf502-b0bcc76f03ba',
    productQuantity: 3,
    id: '3'
  }
];

console.log('=== MOCK CART DATA ===');
console.log('Full Mock Cart:', mockCart);

// Empty mock cart for fresh tests
export const emptyMockCart = [];
console.log('Empty Mock Cart:', emptyMockCart);

// Mock cart with single item
export const singleItemMockCart = [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    productQuantity: 1,
    id: '1'
  }
];
console.log('Single Item Mock Cart:', singleItemMockCart);

// Function to create a fresh copy of mock cart
export function getFreshMockCart() {
  return JSON.parse(JSON.stringify(mockCart));
}
console.log('Fresh Mock Cart Function Created:', getFreshMockCart());

