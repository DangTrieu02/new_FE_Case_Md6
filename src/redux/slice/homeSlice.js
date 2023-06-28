import {createSlice} from "@reduxjs/toolkit";
import { createHome, editHome, getAllCategory, getAllHome, getHomeById, getHomeByUser } from "../../service/homeService";
import {
    getHomeByCategory,
    getHomeByAddress,
    getHomeByName,
    getHomeByPrice,
    getHomeByStatus,
} from "../../service/homeService";

const initialState = {
    list: [],
    userList: [],
    currentHome: null,
    catgoryList:[],
    filters: {
        category: "",
        address: "",
        nameHome: "",
        price: {
            min: "",
            max: "",
        },
        status: "",
    },
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filters = action.payload;
        },
        resetFilter: (state) => {
            state.filters = {
                category: "",
                address: "",
                nameHome: "",
                price: {
                    min: "",
                    max: "",
                },
                status: "",
            };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllHome.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(createHome.fulfilled, (state, action) => {
            state.list.push(action.payload);
        });
        builder.addCase(getHomeByUser.fulfilled, (state, action) => {
            state.userList = action.payload;
        });
        builder.addCase(editHome.fulfilled,(state,action)=>{
            state.userList = action.payload
            for(let i=0; i<state.userList.length;i++){
                if(state.userList[i] === action.payload.idHome){
                    state.userList[i]={...action.payload}
                    break;
                }
            }
        })
        builder.addCase(getHomeById.fulfilled, (state, action) => {
            state.currentHome = action.payload;
        });
        builder.addCase(getAllCategory.fulfilled,(state,action)=>{
            state.catgoryList = action.payload
        })
        builder.addCase(getHomeByCategory.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(getHomeByAddress.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(getHomeByName.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(getHomeByPrice.fulfilled, (state, action) => {
            state.list = action.payload;
        });
        builder.addCase(getHomeByStatus.fulfilled, (state, action) => {
            state.list = action.payload;
        });
    },
});

export const {setFilter, resetFilter} = homeSlice.actions;
export default homeSlice.reducer;
