const { createSlice } = require("@reduxjs/toolkit");



const ExpenseReducer = createSlice({
    name:'expenseReducer', 
    initialState:{
        expenses:[],
        categories: [], 
        flag: false
    }, 
    reducers:{
        setExpenses:(state, action)=>{
            state.expenses = action.payload
        },
        setCategories:(state, action)=>{
            state.categories = action.payload
        },
        setAddExpenseFlag: (state)=>{
            state.flag = !state.flag
        }
    }
})



export const {setExpenses , setCategories , setAddExpenseFlag} = ExpenseReducer.actions
export default ExpenseReducer.reducer