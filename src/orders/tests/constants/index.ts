export const checkoutId = '2e17ae4b-c348-4e57-8724-066860c22b43';

export const paymentMock = {
  userId: '2e17ae4b-c348-4e57-8724-066860c22b43',
  productId: '2e17ae4b-c348-4e57-8724-066860c22b43',
  productTitle: 'Book',
  productPrice: 360,
  quantity: 200,
};

export const createOrderInputSuccess = {
  status: true,
  checkoutId: '2e17ae4b-c348-4e57-8724-066860c22b43',
  amount: 6000,
  email: 'john@doe.com',
};

export const createOrderInputFailure = {
  status: false,
  checkoutId: '2e17ae4b-c348-4e57-8724-066860c22b43',
  amount: 6000,
  email: 'john@doe.com',
};
