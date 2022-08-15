import { useRef} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { loginHandler } from '../../redux/userReducer';


export const Login = () => {



    const inputEmail = useRef()
    const inputPassword = useRef()

    const dispatch = useDispatch()


    const submitHandler = (e)=>{
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
        })
        .catch(err=> console.log('error in api call ' , err))
        console.log('bs Yunhi ', res)
      }
      request()
      inputEmail.current.value=''
      inputPassword.current.value=''
    }

  return (<>
  <div className='col-md-3 m-auto border p-5 shadow-light'>
         <h3 className='display-5 my-3'>Login</h3>
          <form  onSubmit={submitHandler}>
            <input type='email' ref={inputEmail}  placeholder='email' className='form-control my-3'/> 
            <input type='password' ref={inputPassword}  placeholder='pasword' className='form-control'/> 
            <button className='btn btn-success my-3' value='submit' type='submit'>Login</button>
          </form>
          <p>Don't have an account ? <Link to='/signup'>Sign Up</Link>  </p>
        </div>  
  </>);
};
