import {createSlice} from "@reduxjs/toolkit";
import { getAllHome } from "../../service/homeService";

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
    }
})
export default homeSlice.reducer