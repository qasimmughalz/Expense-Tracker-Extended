import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../redux/ExpenseReducer";



export const CategoryList = () => {

    // const [categories, setCategories] = useState([])
    // const category = useSelector(state=> state.expenseReducer.categories)
    const category = useSelector(state=> state.expense.categories)
    console.log("hhh========", category)
    const token = localStorage.getItem('token')
    const dispatch = useDispatch()

    useEffect(()=>{

        const fetchData = async ()=>{
            const res = await axios({
                method:'GET', 
                url:'https://localhost:8000/user/getCategories', 
                headers:{
                    'authorization': `Bearer ${token}`
                }
            }).then((res)=>{
                console.log("Categories Received", res)
                dispatch(setCategories(res.data))  
            }).catch((err)=> console.log("Categories Fetch Error", err))
        }
        fetchData()

    },[])

  return (
    <>
      <div className="d-flex flex-wrap">
            {category.length <= 0 ? '' : (category.map((data)=>{
                return  <span key={data} className='border border-dark rounded px-2 m-1 category'>{data}</span> 
            }))}
      </div>
    </>
  );
};
