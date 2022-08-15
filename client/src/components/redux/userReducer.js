
import { createSlice } from "@reduxjs/toolkit"



const userReducer = createSlice({
    name:'user', 
    initialState:{
        loggedIn: false, 
        token: ''
        
    }, 
    reducers:{
        loginHandler:(state, action)=>{
            state.loggedIn = true
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        },
        logoutHandler:(state)=>{
            console.log("logout called", state.loggedIn)
            state.loggedIn = false;
            state.token = '';
        }
    }
    
})


export const {loginHandler , logoutHandler} = userReducer.actions
export default userReducer.reducer
