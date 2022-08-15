

import {Router, Route, Routes} from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import { Login } from '../pages/Login/Login'
import { SignUp } from '../pages/Login/SignUp'
import classes from './Authorize.module.css'


export const UnAthorized = ()=>{
    return(
        <div className={classes.wrapper}>        
        <Routes>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/signup'  element={<SignUp/>}></Route>
            <Route path='*'  element={<Login/>}></Route>
        </Routes>
        </div>
    )
}



