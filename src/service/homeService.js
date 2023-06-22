import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

export const searchHome = createAsyncThunk("homes/searchHome", async (data) => {
    try {
        const res = await customAxios.get(`/homes/find-by-address?address=${data}`, {
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("access-token"),
            },
        });
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const getAllHome = createAsyncThunk("homes/getAllHome", async () => {
    try {
        const res = await customAxios.get("homes");
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const createHome = createAsyncThunk("homes/createHome", async (homeData) => {
    try {
        const res = await customAxios.post("homes", homeData, {
            headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + localStorage.getItem("access-token"),
            },
        });
        return res.data;
    } catch (error) {
        throw new Error(error.message);
    }
});

export const findByCategoryId = createAsyncThunk(
    "homes/findByCategoryId",
    async (categoryId) => {
        try {
            const res = await customAxios.get(`/homes/categories/${categoryId}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer " + localStorage.getItem("access-token"),
                },
            });
            return res.data;
        } catch (error) {
            throw new Error(error.message);
        }
    }
);
