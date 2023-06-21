import {createSlice} from "@reduxjs/toolkit";
import {editUser, login, loginWithGoogle, showUser} from "../../service/userService";

const initialState ={
    currentUser:JSON.parse(localStorage.getItem("user")),
    user:[]
}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder.addCase(login.fulfilled,(state,action)=>{
            state.currentUser= action.payload.data
            console.log(1)
            localStorage.setItem("user",JSON.stringify(action.payload))
            localStorage.setItem("access-token",action.payload.token)
        })
        builder.addCase(loginWithGoogle.fulfilled,(state,action)=>{
            state.currentUser= action.payload
            localStorage.setItem("user",JSON.stringify(action.payload))
            localStorage.setItem("access-token",action.payload.token)
        })
        builder.addCase(editUser.fulfilled,(state,action)=>{
            state.currentUser = action.payload
        })
        builder.addCase(showUser.fulfilled, (state, action) => {
            state.currentUser = action.payload
        })
    }
})
export default userSlice.reducer