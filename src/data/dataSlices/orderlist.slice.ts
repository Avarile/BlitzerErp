import { createSlice } from "@reduxjs/toolkit";

export const orderListSlice = createSlice({
  name: "orderList",
  initialState: {
    orderList: [],
  },
  reducers: {
    setOrderList: (state, action) => {
      return {
        ...state,
        orderList: action.payload,
      };
    },
  },
});

export const { setOrderList } = orderListSlice.actions;
export const selectOrderList = (state: any) => state.orderList;
export default orderListSlice.reducer;
