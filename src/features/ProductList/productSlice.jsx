import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { fetchAllProducts, fetchProductsByFilter } from './productApi'



const initialState = {
  products: [],
  categories: [],
  status:'idle'
}

export const fetchAllProductsAsync=createAsyncThunk(
  'product/fetchAllProducts',
  async()=>{
    const response =await fetchAllProducts()
    return response
  }
)
export const fetchProductsByFilterAsync=createAsyncThunk(
  'product/fetchProductsByFilter',
  async(filter)=>{
    const response =await fetchProductsByFilter(filter)
    return response
  }
)

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    decrement: (state) => {
        state.value -= 1
      },
  },
  extraReducers:(builder)=>{
    builder.addCase(fetchAllProductsAsync.pending,(state)=>{
      state.status='loading'
    })
    builder.addCase(fetchAllProductsAsync.fulfilled,(state,action)=>{
      state.status='idle';
      state.products=action.payload
    })
    builder.addCase(fetchProductsByFilterAsync.pending,(state)=>{
      state.status='loading'
    })
    builder.addCase(fetchProductsByFilterAsync.fulfilled,(state,action)=>{
      state.status='idle';
      state.products=action.payload
    })
    
  }
})

// Action creators are generated for each case reducer function
export const {decrement} = productSlice.actions

export const selectAllProducts=(state)=>{
  // console.log(state)
  return state.product.products
}
export const filterProducts=(state)=>{
  // console.log(state)
  return state.product.products
}

export default productSlice.reducer