import { Header } from "./Header/Header"


export const Layout = (props)=>{
    return(<>   

        <Header/>
        
        {props.children}
    
    </>)
}