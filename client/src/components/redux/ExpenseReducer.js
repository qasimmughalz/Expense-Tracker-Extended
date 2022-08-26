const { createSlice } = require("@reduxjs/toolkit");



const ExpenseReducer = createSlice({
    name:'expenseReducer', 
    initialState:{
        expenses:[],
        categories: [], 
        flag: false, 
        temp_del_expense_id:'', 
        selectedCategory:''
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
        }, 
        setTempDelExpenseId:(state, action)=>{
            state.temp_del_expense_id = action.payload
        }, 
        setSelectedCategory:(state, action)=>{
            state.selectedCategory = action.payload
        }
    }
})



export const {setExpenses , setCategories , setAddExpenseFlag, setTempDelExpenseId, setSelectedCategory} = ExpenseReducer.actions
export default ExpenseReducer.reducer