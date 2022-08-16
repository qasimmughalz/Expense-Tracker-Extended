import { useRef, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { loginHandler } from '../../redux/userReducer';
import { Spinner } from '../../Layout/Spinner/Spinner';


export const Login = () => {



    const inputEmail = useRef()
    const inputPassword = useRef()
    const [loading, setLoading]= useState(false)
    const [message, setMessage]= useState('')
    const [shoeMessage, setShowMessage]= useState(false)

    const dispatch = useDispatch()


    const submitHandler = (e)=>{
      setLoading(true)
      e.preventDefault() 
      const request = async ()=>{
        localStorage.setItem('email', inputEmail.current.value)
        const res = await axios({
          method:'POST', 
          url:'https://localhost:8000/login', 
          data: {email: inputEmail.current.value, password:inputPassword.current.value.trim()}
        })
        .then(res=>{
          console.log('Data in Response', res);
          console.log("token==", res.data.accessToken)
          dispatch(loginHandler(res.data.accessToken))
          setLoading(false)
        })
        .catch(err=> {
        console.log('error in api call ' , err)
        setMessage(err.response.data.message)
        setShowMessage(true)
        setLoading(false)
        })
      }
      request()
      inputEmail.current.value=''
      inputPassword.current.value=''
    }

  return (<>
  <div className='col-md-4 m-auto border p-5 shadow-light'>
         <h3 className='display-5 my-3'>Login</h3>
          <form  onSubmit={submitHandler}>
            <input type='email' ref={inputEmail}  placeholder='email' className='form-control my-3'/> 
            <input type='password' ref={inputPassword}  placeholder='pasword' className='form-control'/> 
            {shoeMessage && <p className='text-danger mt-3'>{message}</p>}
            <button className='btn btn-success my-3' value='submit' type='submit'>
               {loading ? <Spinner/> : 'Login'} </button>
          </form>
          <p>Don't have an account ? <Link to='/signup'>Sign Up</Link>  </p>
        </div>  
  </>);
};
