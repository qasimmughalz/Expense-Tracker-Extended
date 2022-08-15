import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses } from "../../redux/ExpenseReducer";

export const ExpensesHistory = () => {
  const [data, setData] = useState();

  const token = localStorage.getItem("token");


  const reduxData = useSelector((state=> state.expense.expenses))


  const checkFlag = useSelector((state=> state.expense.flag))
  
  
  console.log("data", reduxData)

  const dispatch = useDispatch()

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



 

  useEffect(() => {
    AsyncFetch();
  }, [checkFlag]);

  return (
    <>
      <div >
        <ul className="m-0 ">
                <li className="row  p-1  my-2">
                  <p className="col fw-bold">Expense</p>
                  <p className="col fw-bold">Price</p>
                  <p className="col fw-bold">Actions</p>
                </li>
          {reduxData &&
            reduxData.slice(0).reverse().map((result) => {
              return (
                <li className="row  p-1  my-2  " key={result.title}>
                  <span className="col" style={{textAlign:'left'}}>{result.title}</span>
                  <span className="col">{result.expense}</span>
                  <span className="col">
                    <i class="fas fa-trash text-danger small mx-2"></i>
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
