import { useDispatch } from 'react-redux'
import logo from '../../../assets/img/logo.png'
import { logoutHandler } from '../../redux/userReducer'
import classes from './Header.module.css'

export const Header = (props)=>{

    const dispatch = useDispatch()

    const logout = ()=>{
        localStorage.clear()
        dispatch(logoutHandler())
    }
    

    return(<>
    <div className="bg-white shadow-light container-fluid ">
        
        <div className="row justify-content-between p-1">
            <div className="col-md-2">
                    <img src={logo} alt="logo " className={classes.logo}/>
                    SeniUyuiU
            </div>
            <div className="col-md-1 my-auto">
                    <div className="row justify-content-around align-items-center">
                        <div className="col">
                        <div className="btn-group dropstart">
                            <i className="fas fa-bars"  data-bs-toggle="dropdown" aria-expanded="false"></i>
                                <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" onClick={logout}>Logout Now</a></li>
                                </ul>
                        </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
    <div >
        {props.children}
    </div>
    </>)
}