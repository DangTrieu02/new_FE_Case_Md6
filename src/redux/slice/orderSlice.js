import { createSlice } from "@reduxjs/toolkit";
import { rentHome } from "../../service/orderService";

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
            });
    },
});

export default orderSlice.reducer;
