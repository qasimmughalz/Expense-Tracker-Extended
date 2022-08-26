
import { useRef, useState } from "react"
import axios from "axios"



export const AddCategory = ()=>{

    const inputCategory = useRef()
    // const [message, setMessage]= useState('')
    const [shoeMessage, setShowMessage]= useState(false)



    
    const submitHandler = (e)=>{
      e.preventDefault() 

      if(inputCategory.current.value == ''){
        setShowMessage(true)
      }else{
      const request = async ()=>{
        const token = localStorage.getItem('token')
        const email = localStorage.getItem('email')
        const res = await axios({
          method:'POST', 
          url:'https://localhost:8000/user/categories', 
          data: {category: inputCategory.current.value }, 
          headers : {
            'authorization': `Bearer ${token}`
          }
        })
        .then(res=>{
          console.log('CategoryApi Added Res', res)
          setShowMessage(false)
        })
        .catch(err=> console.log('CategoryApi Err ' , err))
        setShowMessage(false)
      }
      request()
      inputCategory .current.value=''
    }
    }
    return(<>
    <div>

        <form  onSubmit={submitHandler}>
            <input type='text' ref={inputCategory}  placeholder='add category' className='form-control my-3'/> 
            <div class="d-grid col-10 mx-auto ">
              {shoeMessage && <p className="text-danger">Please Enter Category</p>}
            <button className='btn btn-block btn-primary ' value='submit' type='submit'>Add </button>
            </div>
 
          </form>
    </div>

    </>)
}