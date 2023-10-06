export enum SortOrder {
  Ascending = 'ASC',
  Descending = 'DESC',
}

export enum ProductField {
  id = 'id',
  title = 'title',
  price = 'price',
  isAvailable = 'isAvailable',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

type productExample = {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
export const productExample: productExample = {
  id: '2e17ae4b-c348-4e57-8724-066860c22b43',
  title: 'book',
  description: 'A very nice book',
  price: 250,
  isAvailable: true,
};

export type verifyPayment = {
  status: boolean;
  checkoutId?: string;
  amount?: number;
  email?: string;
};

type OrderExample = {
  id: string,
  paymentId: string,
  productPrice: number,
  product: productExample,
  quantity: number,
  createdAt: string,
  updatedAt?:string,
}
export const orderExample:OrderExample={
  id:'7f212c67-13d9-441e-8346-d8fb9851f49a',
  paymentId:'4caee7df-c991-40c1-933b-d963527d1a28',
  product: {
    title: 'Book'
  },
  productPrice: 250,
  quantity: 1,
  createdAt: '2023-10-05 05:24:09.961175'
}