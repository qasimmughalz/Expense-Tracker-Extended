import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
// import { Login } from "./components/pages/Login/Login";
import { loginHandler, logoutHandler } from "./components/redux/userReducer";
import { Athorized } from "./components/routes/Authorized";
import { UnAthorized } from "./components/routes/UnAuthorized";

function App() {

  const userLoggedIn = useSelector(state=> state.userAuth.loggedIn)
  console.log("App", userLoggedIn)
  const dispatch = useDispatch()
  const localToken = localStorage.getItem('token')



   // function isTokenExpired(token) {
  //   const payloadBase64 = token.split(".")[1];
  //   const decodedJson = Buffer.from(payloadBase64, "base64").toString();
  //   const decoded = JSON.parse(decodedJson);
  //   const exp = decoded.exp;
  //   const expired = Date.now() >= exp * 1000;
  //   return expired;
  // }


  async function ValidateToken(token){
    const res = await axios({
      method:'POST', 
      url:'https://localhost:8000/verifyToken', 
      headers:{
        'authorization':`Bearer ${token}`
      }
    }).then((res)=>{  
      if(res.status === 200){
        dispatch(loginHandler(token))
      }else{
        dispatch(logoutHandler)
      }
    }).catch((err)=>{
      console.log("Err", err)
      dispatch(logoutHandler)
    })
  }


  if(!localToken){
    console.log("Sorry , No Token Found ")
    dispatch(logoutHandler())
  }else{
    console.log("Token Found")
    ValidateToken(localToken)
  }

  return (
    <div className="App ">
          <div className="container-fluid p-0 ">
             {userLoggedIn ? <Athorized/> : <UnAthorized/>}
          </div>  
        
    </div>
  );
}

export default App;
