import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/ProductList/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
})