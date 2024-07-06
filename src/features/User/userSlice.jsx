import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { getLoggedInUserOrdersById } from './userApi'


const initialState = {
    userOrders:[],
    status:'idle'
  }

  export const getLoggedInUserOrdersByIdAsync=createAsyncThunk(
    'user/getLoggedInUserOrdersById',
    async(id)=>{
      const response =await getLoggedInUserOrdersById(id)
      return response
    }
  )


  export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers:(builder)=>{
      builder.addCase(getLoggedInUserOrdersByIdAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(getLoggedInUserOrdersByIdAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.userOrders=(action.payload)
      })
    }
})

export const selectLoggedInUserOrders=(state)=>{
    return state.user.userOrders
  }
export default userSlice.reducer