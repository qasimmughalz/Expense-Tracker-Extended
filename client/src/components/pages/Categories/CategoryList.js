import axios from "axios";
import { useEffect, useState } from "react";



export const CategoryList = () => {

    const [categories, setCategories] = useState([])
    const token = localStorage.getItem('token')

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
                setCategories(res.data)
            }).catch((err)=> console.log("Categories Fetch Error", err))
        }
        fetchData()

    },[])


  return (
    <>
      <div>
        <ul>
            {categories && categories.map((data)=>{
                return  <li key={data}>{data}</li>
            })}
        </ul>
      </div>
    </>
  );
};
