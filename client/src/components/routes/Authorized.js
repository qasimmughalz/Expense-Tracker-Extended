

import {Router, Route, Routes} from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard/Dashboard'
import classes from './Authorize.module.css'


export const Athorized = ()=>{
    return(
        
    <div className={classes.wrapper}>   
        <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/dashboard'  element={<Dashboard/>}></Route>
            <Route path='*'  element={<Dashboard/>}></Route>
        </Routes>
    </div>
    
    )
}



