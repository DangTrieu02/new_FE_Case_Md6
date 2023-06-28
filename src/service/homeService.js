import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllHome = createAsyncThunk("homes/getAllHome",async()=>{
    const res = await customAxios.get("homes/")
    return res.data
})

export const addHome = createAsyncThunk("homes/addHome", async (data) => {
    await customAxios.post("homes/", data,
        { headers: {
                'Content-Type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('access-token'),
            }});
    const res = await customAxios.get("homes/")
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
    const res= await customAxios.get(`/homes/${id}`)
    return res.data
});
export const getAllCategory = createAsyncThunk(`homes/getAllCategory`,async()=>{
    const res= await customAxios.get(`/homes/category`)
    return res.data
});

export const getHomeByCategory = createAsyncThunk(
    `homes/getHomeByCategory`,
    async (categoryId) => {
        const res = await customAxios.get(`homes/categories/${categoryId}`);
        return res.data;
    }
);

export const getHomeByPrice = createAsyncThunk(
    `homes/getHomeByPrice`,
    async ({min, max}) => {
        const res = await customAxios.get(`homes/price?min=${min}&max=${max}`);
        return res.data;
    }
);

export const getHomeByName = createAsyncThunk(
    `homes/getHomeByName`,
    async (nameHome) => {
        const res = await customAxios.get(`homes/filter?nameHome=${nameHome}`);
        console.log(res.data);
        return res.data;
    }
);

export const getHomeByStatus = createAsyncThunk(
    `homes/getHomeByStatus`,
    async (status) => {
        const res = await customAxios.get(`homes/status?status=${status}`);
        return res.data;
    }
);

export const getHomeByAddress = createAsyncThunk(
    "homes/getHomeByAddress",
    async (address) => {
        const res = await customAxios.get(
            `homes/find-by-address?address=${address}`
        );
        return res.data;
    }
);



