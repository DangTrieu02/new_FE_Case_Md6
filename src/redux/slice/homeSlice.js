// homeSlice.js
import {createSlice} from "@reduxjs/toolkit";
import {
    createHome,
    getAllHome,
    getHomeById,
    getHomeByUser,
    getHomeByCategory,
    getHomeByAddress,
    getHomeByName,
    getHomeByPrice,
    getHomeByStatus
} from "../../service/homeService";

const initialState = {
    list: [],
    userList: [],
    currentHome: null,
    category: '',
    address: '',
    name: '',
    price: {
        min: '',
        max: '',
    },
    status: ''
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getAllHome.fulfilled, (state, action) => {
            state.list = action.payload
        })
        builder.addCase(createHome.fulfilled, (state, action) => {
            state.list.push(action.payload)
        })
        builder.addCase(getHomeByUser.fulfilled, (state, action) => {
            state.userList = action.payload
        })
        builder.addCase(getHomeById.fulfilled, (state, action) => {
            state.currentHome = action.payload
        })
        builder.addCase(getHomeByCategory.fulfilled, (state, action) => {
            state.list.category = action.payload
            // Update state with the received data for getHomeByCategory
        })
        builder.addCase(getHomeByAddress.fulfilled, (state, action) => {
            state.list.address = action.payload
            // Update state with the received data for getHomeByAddress
        })
        builder.addCase(getHomeByName.fulfilled, (state, action) => {
            state.list.name = action.payload
            // Update state with the received data for getHomeByName
        })
        builder.addCase(getHomeByPrice.fulfilled, (state, action) => {
            state.list.price = action.payload
            // Update state with the received data for getHomeByPrice
        })
        builder.addCase(getHomeByStatus.fulfilled, (state, action) => {
            state.list.status = action.payload
            // Update state with the received data for getHomeByStatus
        })
    }
})
export default homeSlice.reducer