import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  categories: string[];
  inStockOnly: boolean;
}

const initialState: FilterState = {
  categories: [],
  inStockOnly: false,
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    toggleInStockOnly(state) {
      state.inStockOnly = !state.inStockOnly;
    },
  },
});

export const { setCategories, toggleInStockOnly } = filterSlice.actions;
export default filterSlice.reducer;
