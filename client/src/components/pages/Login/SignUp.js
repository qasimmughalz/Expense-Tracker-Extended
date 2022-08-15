import { useRef} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import {Navigate} from 'react-router-dom'

export const SignUp = () => {

    const navigate = useNavigate()

    const inputName = useRef()
    const inputGender = useRef()
    const inputAge = useRef()
    const inputEmail = useRef()
    const inputPassword = useRef()



    const submitHandler = (e)=>{
      e.preventDefault() 
      const request = async ()=>{
        const res = await axios({
          method:'POST', 
          url:'https://localhost:8000/signup', 
          data: {
            name: inputName.current.value,
            gender:inputGender.current.value, 
            age: inputAge.current.value,
            email: inputEmail.current.value, 
            password:inputPassword.current.value
          }
        })
        .then(data=>{
          console.log('Data in Response', data)
          navigate('/login')
        })
        .catch(err=> console.log('error in api call ' , err))
        console.log('bs Yunhi ', res)
      }
      request()

      inputName.current.value = ''
      inputAge.current.value = ''
      inputEmail.current.value = ''
      inputPassword.current.value = ''
    }





  return (<>
  <div className='col-md-3 m-auto border shadow-light p-5'>
         <h3 className='display-6 my-3'>Sign Up</h3>
          <form  onSubmit={submitHandler}>
          <input type='text' ref={inputName}  placeholder='full name' className='form-control my-3'/> 
            <div className='row justify-content-center align-items-center'>
              <div className='col'>
              <select type="select" ref={inputGender} className='form-select'>
              <option value="male">male</option>
              <option value="female">female</option>
              <option value="other">female</option>
            </select>
               </div>
               <div className='col'>
                <input type='number' min='15' ref={inputAge}  placeholder='age' className='form-control my-3'/> 
               </div>
            </div>
            <input type='email' ref={inputEmail}  placeholder='email' className='form-control my-3'/> 
            <input type='password' ref={inputPassword}  placeholder='pasword' className='form-control'/> 
            <button className='btn btn-success my-3' value='submit' type='submit'>Sign Up</button>
          </form>
          <p>Have an account ? <Link to='/login'>Login</Link>  </p>
        </div>  
  </>);
};
