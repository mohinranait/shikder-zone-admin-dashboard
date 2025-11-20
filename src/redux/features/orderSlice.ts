import { TOrder } from "@/types/order.type";
import { createSlice } from "@reduxjs/toolkit";

type Props = {
    orders: TOrder[],
}

const initialState:Props = {
    orders: [],
}
export const orderSlice = createSlice({
    name:"order",
    initialState,
    reducers:{
        setAllOrders:(state, action: {payload: TOrder[]} ) => {
            state.orders = action.payload;
        }
    }
})

export const {setAllOrders} = orderSlice.actions;
export default orderSlice.reducer;