import { useRef} from 'react'
import axios from 'axios'
import { AsyncFetch } from './ExpensesHistory';
import { useDispatch, useSelector } from 'react-redux';
import { setAddExpenseFlag } from '../../redux/ExpenseReducer';


export const AddExpense = () => {

    const inputTitle = useRef()
    const inputAmount = useRef()
    const inputCategory = useRef()
    const category = useSelector(state=> state.expense.categories)
    const dispatch = useDispatch()


    const submitHandler = (e)=>{
      e.preventDefault() 

      const token = localStorage.getItem('token')
      const email = localStorage.getItem('email')
      const allData = {
        email: email, 
        title:inputTitle.current.value ,
        category:inputCategory.current, 
        expense:inputAmount.current.value 
      }
      console.log("All Data", allData)
      const request = async ()=>{
        
        const res = await axios({
          method:'POST', 
          url:'https://localhost:8000/expense/add', 
          data: allData, 
          headers : {
            'authorization': `Bearer ${token}`
          }
        })
        .then(res=>{
          console.log('Adding Data Respo', res)
          dispatch(setAddExpenseFlag())
        })
        .catch(err=> console.log('error in api call ' , err))
        console.log('bs Yunhi ', res)
      }
      request()
      inputTitle.current.value=''
      inputAmount.current.value=''
    }


    const handleSelectedCategory= (e)=>{
        console.log("check val", e.target.value)
        console.log("category", inputCategory)
        inputCategory.current = e.target.value
        console.log("category after", inputCategory)
    }

  return (<>
  <div className='m-auto p-5 '>
    <h5>Add New Expense</h5>
          <form  onSubmit={submitHandler}>
            <input type='text' ref={inputTitle}  placeholder='expense title' className='form-control my-3'/> 

            <select name="" id="" className='form-select my-3' onChange={(e)=> handleSelectedCategory(e)}>
            {category.length <= 0 ? '' : (category.map((data)=>{
                return  <option value={data}>{data}</option> 
            }))}
              
            </select>
            <input type='number' ref={inputAmount}  placeholder='expense amount' className='form-control'/> 
            <button className='btn btn-primary my-3' value='submit' type='submit'>Add </button>
          </form>
        </div>  
  </>);
};
