import { useDispatch, useSelector } from "react-redux";
import "./App.css";
// import { Login } from "./components/pages/Login/Login";
import { loginHandler } from "./components/redux/userReducer";
import { Athorized } from "./components/routes/Authorized";
import { UnAthorized } from "./components/routes/UnAuthorized";

function App() {


  const dispatch = useDispatch()
  const localToken = localStorage.getItem('token')
 
  if(localToken){
    dispatch(loginHandler(localToken))
  }
  

  const userLoggedIn = useSelector(state=> state.userAuth.loggedIn)
  console.log("App", userLoggedIn)


  return (
    <div className="App ">
          <div className="container-fluid p-0 ">
             {userLoggedIn ? <Athorized/> : <UnAthorized/>}
          </div>  
        
    </div>
  );
}

export default App;
