import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types';
import { nanoid } from 'nanoid';

interface ProductsState {
  products: Product[];
  selected: string[];
  filters: {
    category: string;
    inStockOnly: boolean;
  };
}

const initialState: ProductsState = {
  products: [
    { id: nanoid(), name: 'iPhone 14', category: 'Electronics', stock: 10, price: 999 },
    { id: nanoid(), name: 'Jeans', category: 'Apparel', stock: 3, price: 40 },
    { id: nanoid(), name: 'Burger', category: 'Food', stock: 20, price: 5 },
    { id: nanoid(), name: 'TV', category: 'Electronics', stock: 0, price: 450 },
    { id: nanoid(), name: 'T-Shirt', category: 'Apparel', stock: 12, price: 20 },
  ],
  selected: [],
  filters: {
    category: '',
    inStockOnly: false,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.filters.category = action.payload;
    },
    toggleInStockFilter(state) {
      state.filters.inStockOnly = !state.filters.inStockOnly;
    },
    toggleSelectProduct(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.selected.includes(id)) {
        state.selected = state.selected.filter((pid) => pid !== id);
      } else {
        state.selected.push(id);
      }
    },
    toggleSelectAll(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.selected = state.products.map((p) => p.id);
      } else {
        state.selected = [];
      }
    },
    deleteSelectedProducts(state) {
      state.products = state.products.filter((p) => !state.selected.includes(p.id));
      state.selected = [];
    },
    deleteProductById(state, action: PayloadAction<string>) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      state.selected = state.selected.filter((id) => id !== action.payload);
    },
    addProduct(state, action: PayloadAction<Omit<Product, 'id'>>) {
      const newProduct: Product = { id: nanoid(), ...action.payload };
      state.products.push(newProduct);
    },
    editProduct(state, action: PayloadAction<Product>) {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
  },
});

export const {
  setCategoryFilter,
  toggleInStockFilter,
  toggleSelectProduct,
  toggleSelectAll,
  deleteSelectedProducts,
  deleteProductById,
  addProduct,
  editProduct,
} = productsSlice.actions;

export default productsSlice.reducer;
