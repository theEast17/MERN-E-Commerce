import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder } from "./orderApi";

const initialState = {
  orderItems: [],
  currentOrder: null,
  status: "idle",
};

export const addOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (item) => {
    const response = await addOrder(item);
    return response;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addOrderAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addOrderAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.orderItems.push(action.payload);
      state.currentOrder = action.payload;
    });
  },
});

export const { resetOrder } = orderSlice.actions;

export const selectOrderItem = (state) => {
  return state.order.orderItems;
};

export const selectCurrentOrder = (state) => {
  return state.order.currentOrder;
};

export default orderSlice.reducer;
