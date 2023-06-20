import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import homeReducer from './slice/homeSlice'
const store = configureStore({
    reducer:{
        user:userReducer,
        home:homeReducer
    }

})
export default store