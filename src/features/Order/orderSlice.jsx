import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addOrder, getAllOrder, updateOrder } from "./orderApi";

const initialState = {
  orderItems: [],
  currentOrder: null,
  totalOrders: 0,
  status: "idle",
};

export const addOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (item) => {
    const response = await addOrder(item);
    return response;
  }
);
export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response;
  }
);

export const getAllOrderAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({ sort, pagination }) => {
    const response = await getAllOrder(sort, pagination);
    // The value we return becomes the `fulfilled` action payload
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
    builder.addCase(getAllOrderAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getAllOrderAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.orderItems = action.payload.orders;
      state.totalOrders = action.payload.totalItems;
    });
    builder.addCase(updateOrderAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateOrderAsync.fulfilled, (state, action) => {
      state.status = "idle";
      const index = state.orderItems.findIndex(
        (order) => order.id === action.payload.id
      );
      state.orderItems[index] = action.payload;
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
export const selectTotalOrder = (state) => {
  return state.order.totalOrders;
};

export default orderSlice.reducer;
