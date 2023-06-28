import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import homeReducer from './slice/homeSlice'
import categoryReducer from "./slice/categorySlice";

const store = configureStore({
    reducer:{
        user:userReducer,
        home:homeReducer,
        categories: categoryReducer,

    }
})
export default store