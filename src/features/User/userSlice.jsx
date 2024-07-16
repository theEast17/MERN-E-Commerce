import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getLoggedInUserById,
  getLoggedInUserOrdersById,
  updateUser,
} from "./userApi";

const initialState = {
  userOrders: [],
  userInfo: null,
  status: "idle",
};

export const getLoggedInUserOrdersByIdAsync = createAsyncThunk(
  "user/getLoggedInUserOrdersById",
  async (id) => {
    const response = await getLoggedInUserOrdersById(id);
    return response;
  }
);
export const getLoggedInUserByIdAsync = createAsyncThunk(
  "user/getLoggedInUserById",
  async (userId) => {
    const response = await getLoggedInUserById(userId);
    return response;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (user) => {
    const response = await updateUser(user);
    return response;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getLoggedInUserOrdersByIdAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(
      getLoggedInUserOrdersByIdAsync.fulfilled,
      (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      }
    );
    builder.addCase(getLoggedInUserByIdAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getLoggedInUserByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
    })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrders = action.payload;
      });
  },
});

export const selectLoggedInUserOrders = (state) => {
  return state.user.userOrders;
};
export const selectLoggedInUserInfoById = (state) => {
  return state.user.userInfo;
};

export default userSlice.reducer;
