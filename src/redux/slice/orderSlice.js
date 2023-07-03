import {createSlice} from "@reduxjs/toolkit";
import {
    rentHome,
    getRentedHome,
    accessOrder,
    refuseOrder,
    checkOutOrder,
    getBookingHistory,
} from "../../service/orderService";

const orderSlice = createSlice({
    name: "order",
    initialState: {
        isLoading: false,
        error: null,
        order: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(rentHome.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.order = null;
            })
            .addCase(rentHome.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(rentHome.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getRentedHome.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(accessOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(accessOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(accessOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(refuseOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(refuseOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(refuseOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(checkOutOrder.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(checkOutOrder.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(checkOutOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })
            .addCase(getBookingHistory.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.order = null;
            })
            .addCase(getBookingHistory.fulfilled, (state, action) => {
                state.isLoading = false;
                state.order = action.payload;
            })
            .addCase(getBookingHistory.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default orderSlice.reducer;
