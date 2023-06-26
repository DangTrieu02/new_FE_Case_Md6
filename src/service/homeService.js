import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllHome = createAsyncThunk("homes/getAllHome",async()=>{
    const res = await customAxios.get("homes/")
    return res.data
})

export const createHome = createAsyncThunk("homes/createHome",async(data)=>{
    const res= await customAxios.post("homes/",data)
    return res.data
});

export const getHomeByUser = createAsyncThunk(`homes/getHomeByUser`,async(id)=>{
    const res= await customAxios.get(`homes/user/${id}`)
    return res.data
});

export const editHome = createAsyncThunk(`homes/editHome`,async(data)=>{
    const res= await customAxios.put(`homes/${data.id}`,data.newHome)
    console.log('Updated');
    return res.data
});
export const getHomeById = createAsyncThunk(`homes/getHomeById`,async(id)=>{
    const res= await customAxios.get(`/homes/detail/${id}`)
    return res.data
});
export const getAllCategory = createAsyncThunk(`homes/getAllCategory`,async()=>{
    const res= await customAxios.get(`/homes/category`)
    return res.data
});



