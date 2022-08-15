import { useRef} from 'react'
import axios from 'axios'
import { AsyncFetch } from './ExpensesHistory';
import { useDispatch } from 'react-redux';
import { setAddExpenseFlag } from '../../redux/ExpenseReducer';


export const AddExpense = () => {



    const inputTitle = useRef()
    const inputAmount = useRef()
    const dispatch = useDispatch()


    const submitHandler = (e)=>{
      e.preventDefault() 
      const request = async ()=>{
        const token = localStorage.getItem('token')
        const email = localStorage.getItem('email')
        const res = await axios({
          method:'POST', 
          url:'https:\\localhost:8000/expense/add', 
          data: {email: email, title:inputTitle.current.value , category:'test', expense:inputAmount.current.value}, 
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

  return (<>
  <div className='m-auto p-5 '>
    <h5>Add New Expense</h5>
          <form  onSubmit={submitHandler}>
            <input type='text' ref={inputTitle}  placeholder='expense title' className='form-control my-3'/> 
            <input type='number' ref={inputAmount}  placeholder='expense amount' className='form-control'/> 
            <button className='btn btn-primary my-3' value='submit' type='submit'>Add </button>
          </form>
        </div>  
  </>);
};
