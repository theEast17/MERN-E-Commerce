import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { checkLoggedInUser, createUser } from './authApi'

const initialState = {
    loggedInUser:null,
    status:'idle'
  }

  export const createUserAsync=createAsyncThunk(
    'user/createUser',
    async(data)=>{
      const response =await createUser(data)
      return response
    }
  )

  export const checkLoggedInUserAsync=createAsyncThunk(
    'user/checkLoggedInUser',
    async(data)=>{
      const response =await checkLoggedInUser(data)
      return response.data
    }
  )

  export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers:(builder)=>{
      builder.addCase(createUserAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(createUserAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.loggedInUser=action.payload
      })
      builder.addCase(checkLoggedInUserAsync.pending,(state)=>{
        state.status='loading'
      })
      builder.addCase(checkLoggedInUserAsync.fulfilled,(state,action)=>{
        state.status='idle';
        state.loggedInUser=action.payload
      })
      .addCase(checkLoggedInUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
    }
})

export const selectLoggedInUser=(state)=>{
    return state.auth.loggedInUser
  }

  export const selectError = (state)=>state.auth.error;

  export default userSlice.reducer