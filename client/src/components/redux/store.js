

import  { configureStore } from '@reduxjs/toolkit'
import ExpenseReducer from './ExpenseReducer'
import userReducer from './userReducer'


export const store = configureStore({
    reducer :{
        userAuth: userReducer, 
        expense: ExpenseReducer
    }
})




