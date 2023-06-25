// homeService.js
import {createAsyncThunk} from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllHome = createAsyncThunk("homes/findAll", async () => {
    const res = await customAxios.get("homes/");
    return res.data;
});

export const createHome = createAsyncThunk(
    "homes/addHome",
    async (data) => {
        const res = await customAxios.post("homes/", data);
        return res.data;
    }
);

export const getHomeByUser = createAsyncThunk(
    `homes/getHomeByUser`,
    async (id) => {
        const res = await customAxios.get(`homes/user/${id}`);
        console.log(res.data, id, "homeservice");
        return res.data;
    }
);

export const getHomeById = createAsyncThunk(`homes/getHomeById`, async (id) => {
    const res = await customAxios.put(`homes/${id}`);
    return res.data;
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
    async (name) => {
        const res = await customAxios.get(`homes/filter?name=${name}`);
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
