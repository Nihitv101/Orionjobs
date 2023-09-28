import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:"users",
    initialState:{
        currentUser:null
    },
    reducers:{
        SetcurrentUser: (state , action)=>{
            state.currentUser = action.payload
        }
    }
})


export const {SetcurrentUser} = userSlice.actions;
export default userSlice.reducer;
