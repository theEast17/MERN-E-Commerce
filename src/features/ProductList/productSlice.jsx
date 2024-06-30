import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    decrement: (state) => {
        state.value -= 1
      },
  },
})

// Action creators are generated for each case reducer function
export const {decrement} = ProductSlice.actions

export default ProductSlice.reducer