import { Layout } from "../../Layout/Layout"
import { AddExpense } from "../Expenses/AddExpense"
import { AddCategory } from "../Categories/AddCategory"
import { CategoryList } from "../Categories/CategoryList"
import { ExpensesHistory } from "../Expenses/ExpensesHistory"


export const Dashboard = ()=>{
    return(
        <Layout>
            <div className="container-fluid p-4">
                <div className="row justify-content-around text-start" >
                    <div className="col-md-2 bg-white rounded">
                        <h5 className="mt-3 text-muted ps-2">Categories</h5>
                        <CategoryList/>
                        <AddCategory/>
                    </div>
                    <div className="col-md-4 bg-white  rounded">
                        <div>
                            <AddExpense/>
                        </div>  
                    </div>
                    <div className="col-md-4 bg-white rounded">
                            <ExpensesHistory/>
                    </div>
                </div>

            </div>
    </Layout>)
}