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
    console.log(res.data,id,"homeservice")
    return res.data
});

export const editHome = createAsyncThunk(`homes/editHome`,async(data)=>{
    const res= await customAxios.get(`homes/${data.id}`,data.newHome)
    return res.data
});
// export const getHomeById = createAsyncThunk(`homes/getHomeById`,async(id)=>{
//     const res= await customAxios.put(`homes/${id}`)
//     return res.data
// });

export const getHomeById = (async(id)=>{
    const res= await customAxios.put(`homes/${id}`)
    return res.data
});
