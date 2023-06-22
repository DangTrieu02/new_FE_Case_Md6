import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const login = createAsyncThunk("users/login",async(data)=>{
    const res = await customAxios.post("users/login",data)
    return res.data
})
export const loginWithGoogle = createAsyncThunk("users/loginWithGoogle",async(data)=>{
    const res = await customAxios.post("/users/login-google",data)
    console.log(res.data);
    return res.data
})
export const editUser = createAsyncThunk(`users/edit-profile/`,async(data)=>{
    await customAxios.put(`users/edit-profile/${data.id}`,data.user)
    const newUser = await customAxios.get(`users/my-profile/${data.id}`)
    return newUser.data
})
