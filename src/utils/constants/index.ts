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
  id: string;
  title: string;
  description: string;
  price: number;
  isAvailable: boolean;
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
