import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../Layout/Modal/Modal";
import {setAddExpenseFlag,setExpenses,setSelectedCategory, setTempDelExpenseId } from "../../redux/ExpenseReducer";

import css from './expense.module.css'

export const ExpensesHistory = () => {


  const [data, setData] = useState();
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch()
  const token = localStorage.getItem("token");


  const category = useSelector((state=> state.expense.categories))
  let reduxData = useSelector((state=> state.expense.expenses))

  const [visibleData, setVisibleData] = useState() 
  console.log("visible data redux wala", visibleData)
  let selectedCategory = useSelector((state=> state.expense.selectedCategory))
  const checkFlag = useSelector((state=> state.expense.flag))
  const id = useSelector(state=> state.expense.temp_del_expense_id)



 

  const AsyncFetch = async () => {
    const res = await axios({
      method: "Get",
      url: "https://localhost:8000/expense",
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log("Get All Expenses Resp ===", res);
        setData(res.data);
        dispatch(setExpenses(res.data))
      })
      .catch((error) => {
        console.log("Get All Expense Error", error);
      });
  };


  const ModalCancelHandler=()=>{
    setModal(false)
  }

  const modalConfirmHandler=()=>{
      
      const DeleteCall = async ()=>{
        const resp = await axios({
          method:'DELETE',
          url:`https://localhost:8000/expense/${id}`,
          headers:{
            'authorization': `Bearer ${token}`
          }
        }).then((res)=>{
          console.log("Deleted", res)
          dispatch(setAddExpenseFlag())
        }).catch((err)=> console.log("Error in Deleting", err))
      }
        DeleteCall()
        setModal(false)
  }


  const deleteHandler = (id)=>{
  
    setModal(true)
    dispatch(setTempDelExpenseId(id))    
  }
  

  useEffect(() => {
    AsyncFetch();
  }, [checkFlag]);


  const handleCategory = (category)=>{
    dispatch(setSelectedCategory(category))
  }

  return (
    <>  
      {modal && <Modal title="Confirm" message="Are you sure you want to delete it permanently ?" confirm={modalConfirmHandler}  cancel={ModalCancelHandler}></Modal>}
      <div className="bg-white">
        <div className="row justify-content-center">
          <div className="col text-center">
            <div className="my-md-5 my-3">
            <span className="display-6 ms-2 text-danger">
              {reduxData && reduxData.reduce((prev, ne)=> { return prev + ne.expense  },0)}
              </span>
            <span className="small">Total</span>
            </div>
          </div>
        </div>

        <div className="d-flex flex-wrap justify-content-start px-4">
            {category.length <= 0 ? '' : (category.map((data)=>{
                return  <span key={data} onClick={()=> handleCategory(data)} className='border border-dark rounded px-2 m-1 category'>{data}</span> 
            }))}
      </div>

        <ul className="m-0 ">
                <li className="row  p-1  my-2">
                  <p className="col fw-bold">Expense</p>
                  <p className="col fw-bold">Category</p>
                  <p className="col fw-bold">Price</p>
                  <p className="col fw-bold">Actions</p>
                </li>
          {reduxData && 
            reduxData.slice(0).reverse().map((result) => {
              return (
                <li className="row  p-1  my-2  " key={result._id}>
                  <span className="col" style={{textAlign:'left'}}>{result.title}</span>
                  <span className="col" style={{textAlign:'left'}}>{result.category}</span>
                  <span className="col">{result.expense}</span>
                  <span className="col">
                    <i class="fas fa-trash text-danger small mx-2 delete-button" onClick={()=> deleteHandler(result._id)}></i>
                    <i class="fas fa-edit small text-primary"></i>
                    </span>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};
