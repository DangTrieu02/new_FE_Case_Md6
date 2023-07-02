// orderService.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

// create
export const rentHome = createAsyncThunk("orders/create", async (data) => {
  // data = {id, checkInDate, checkOutDate }
  const res = await customAxios.post(`orders/*/${data.idHome}`, data);
  return res.data;
});

// get all
export const getRentedHome = createAsyncThunk("orders", async () => {
  const res = await customAxios.get(`orders`);
  return res.data;
});
