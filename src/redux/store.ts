// the store is the store for all the reducers

import {configureStore} from '@reduxjs/toolkit'
import userReducer from './usersSlice';
import loaderReducer from './loaderSlice';


const store = configureStore({
    reducer:{
        users:userReducer,
        loader:loaderReducer,
    }
})



export default store;
