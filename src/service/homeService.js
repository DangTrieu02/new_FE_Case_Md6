import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllHome = createAsyncThunk("homes/getAllHome",async()=>{
    const res = await customAxios.get("homes/")
    return res.data
})