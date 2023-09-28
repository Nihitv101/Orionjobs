"use client";

import store from '@/redux/store';
import {Provider} from 'react-redux';
import React from 'react';


export const ReduxProvider = ({children}: any)=>{
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}


