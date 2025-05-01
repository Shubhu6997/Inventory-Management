export interface Product {
    id: string;
    name: string;
    category: 'Electronics' | 'Apparel' | 'Food';
    stock: number;
    price: number;
  }
  