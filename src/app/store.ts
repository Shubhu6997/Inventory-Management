import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/products/productSlice';
import filterReducer from '../features/filters/filterSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    filters: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
