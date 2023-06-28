import {createSlice} from "@reduxjs/toolkit";
import { addHome, editHome, getAllHome, getHomeById, getHomeByUser } from "../../service/homeService";

const initialState ={
    list:[],
    userList:[],
    currentHome:null
}

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(getAllHome.fulfilled,(state,action)=>{
            state.list = action.payload
        })
        builder.addCase(addHome.fulfilled, (state, action) => {
            state.homes.homes.push(action.payload);
        });
        builder.addCase(getHomeByUser.fulfilled,(state,action)=>{
            state.userList = action.payload
        })
        builder.addCase(editHome.fulfilled,(state,action)=>{
            state.userList = action.payload
            for(let i=0; i<state.userList.length;i++){
                if(state.userList[i] == action.payload.idHome){
                    state.userList[i]={...action.payload}
                    break;
                }
            }
        })
        builder.addCase(getHomeById.fulfilled,(state,action)=>{
            state.currentHome = action.payload
        })
    }
})
export default homeSlice.reducer