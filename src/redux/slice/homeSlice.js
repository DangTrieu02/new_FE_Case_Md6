import {createSlice} from "@reduxjs/toolkit";
import {getAllHome, searchHome,getHomeRented,getHomeForRent} from "../../service/homeService";


const initialState ={
    list:[]
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers:{},

    extraReducers:builder => {
        builder.addCase(getAllHome.fulfilled,(state,action)=>{
            state.list = action.payload
        })
        builder.addCase(searchHome.fulfilled,(state,action)=>{
            state.address = action.payload.address
            state.searchHome = action.payload
        })
        builder.addCase(getHomeForRent.fulfilled, (state, action) => {
            state.homes = action.payload;
            state.home = {};
        });
        builder.addCase(getHomeRented.fulfilled, (state, action) => {
            state.homes = action.payload;
            state.home = {};
        });
    }

})

export default homeSlice.reducer