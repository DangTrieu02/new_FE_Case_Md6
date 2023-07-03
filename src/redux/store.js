import {configureStore} from '@reduxjs/toolkit'
import userReducer from './slice/userSlice'
import homeReducer from './slice/homeSlice'
import orderReducer from './slice/orderSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        home: homeReducer,
        order: orderReducer
    }

})
export default store