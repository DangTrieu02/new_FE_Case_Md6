// orderService.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "./api";

// create
export const rentHome = createAsyncThunk("orders/create", async (data) => {
  // data = { idHome, checkInDate, checkOutDate }
  const res = await customAxios.post(`orders/${data.idHome}`, data);
  return res.data;
});

// get all
export const getRentedHome = createAsyncThunk("orders/getAll", async () => {
  console.log(1)
  const res = await customAxios.get(`orders`);
  console.log( res.data)
  return res.data;
});

// access
export const accessOrder = createAsyncThunk("orders/access", async (id) => {
  const res = await customAxios.put(`orders/${id}`);
  return res.data;
});

// refuse
export const refuseOrder = createAsyncThunk("orders/refuse", async (id) => {
  const res = await customAxios.delete(`orders/${id}`);
  return res.data;
});

// checkOut
export const checkOutOrder = createAsyncThunk("orders/checkOut", async (id) => {
  const res = await customAxios.put(`orders/${id}`);
  return res.data;
});

// get booking history
export const getBookingHistory = createAsyncThunk("orders/getHistory", async () => {
  const res = await customAxios.get(`orders/booking-history`);
  return res.data;
});
