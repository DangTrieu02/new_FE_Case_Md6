import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const getAllHome = createAsyncThunk("homes/getAllHome", async () => {
    const res = await customAxios.get("homes/");
    return res.data;
});

export const createHome = createAsyncThunk(
    "homes/createHome",
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
    async (price) => {
        const res = await customAxios.get(`homes/price?price=${price}`);
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
