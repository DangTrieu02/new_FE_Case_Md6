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
export const searchHomeUpgrade = createAsyncThunk(
    "homes/searchHomes",
    async (data) => {
        const res = await customAxios.get(`/homes/search?=${data}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("access-token"),
            },
        });

        return res.data;
    }
);
export const getHomeById = createAsyncThunk("homes/getHome", async (data) => {
    const res = await customAxios.get("homes/find-by-id/" + data,
        { headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('access-token'),
            }});
    return res.data;
});
export const getHomes = createAsyncThunk("homes/getHomes", async (page) => {
    const res = await customAxios.get("homes?page=" + page);
    return res.data;
});

export const getAllHome = createAsyncThunk("homes/getAllHome",async()=>{
    const res = await customAxios.get("homes")
    return res.data
})
export const getHomeForRent = createAsyncThunk(
    "homes/getHomeForRent",
    async (page) => {
        const res = await customAxios.get('/homes/for-rent?page='+page,
            { headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('access-token'),
                }})
        return res.data;
    })

export const getHomeRented = createAsyncThunk(
    "homes/getHomeRented",
    async (page) => {
        const res = await customAxios.get('/homes/rented?page='+page,
            { headers: {
                    'Content-Type': 'application/json',
                    authorization: 'Bearer ' + localStorage.getItem('access-token'),
                }})
        return res.data;
    })


export const createHome = createAsyncThunk("homes/createHome",async()=>{
    
});