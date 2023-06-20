import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const searchHome = createAsyncThunk(
    "homes/searchHome",
    async (data) => {
        const res = await customAxios.get(`/homes/find-by-address?address=${data}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("access-token"),
            },
        });
        return res.data;
    }
);

export const getAllHome = createAsyncThunk("homes/getAllHome",async()=>{
    const res = await customAxios.get("homes")
    return res.data
})

export const createHome = createAsyncThunk("homes/createHome",async()=>{
    
});