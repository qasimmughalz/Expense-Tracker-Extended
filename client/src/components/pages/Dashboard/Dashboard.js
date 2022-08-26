import { Layout } from "../../Layout/Layout"
import { AddExpense } from "../Expenses/AddExpense"
import { AddCategory } from "../Categories/AddCategory"
import { CategoryList } from "../Categories/CategoryList"
import { ExpensesHistory } from "../Expenses/ExpensesHistory"

import { Chart,  Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Title} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

Chart.register( Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Title)

export const Dashboard = ()=>{


    const expenses = useSelector(state=> state.expense.expenses)
    const GraphDataSet = expenses.map((res)=> res.expense)
    const [chartLabels, setChartLabels] = useState([])

    let monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


    const datesLabel =  expenses.map((res)=> new Date(res.date).toISOString().split('T')[0])
    console.log("ISO Format with T is ", datesLabel)
    
    // const finalDates = datesLabel.map((res)=> res.split('-')[2])
        const updated = datesLabel.map(dates=>  new Date(dates))
        // console.log("New Dates Objects are : ", updated)

        // console.log("Single Check ", updated[0].getDay())
        // updated.forEach(element => {
        //     console.log(`ForEach Dates are : ${element.getDay()}  ${monthNames[element.getMonth()]}`)
        // });

        const temp = updated.map((data)=> {
            console.log("Data is now ", data)
            return `${monthNames[data.getMonth()]} ${data.getDate()}`
        })


       console.log("final labels are :", temp)


    const labels = temp
    const data = {
        labels: labels,
        datasets: [{
          label: 'EXpenses Stats',
          data: GraphDataSet,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      };

      const handleDateChange = ()=>{

      }


    return(
        <Layout>
            <div className="container-fluid p-4">
                <div className="row justify-content-around text-start" >
                    <div className="col-md-2 bg-white rounded">
                        <h5 className="mt-3 text-muted ps-2">Categories</h5>
                        <CategoryList/>
                        <AddCategory/>
                    </div>
                    <div className="col-md-4  rounded">
                        <div>
                            <AddExpense/>
                        </div> 
                        <div>
                            <Line data={data}></Line>
                            <div className="row justify-content-between">
                                <div className="col-md-5 col-5">
                                    <input type='date' className="form-control" onChange={handleDateChange} value='2022-08-23'></input>
                                </div>
                                <div className="col-md-5 col-5">
                                    <input type='date' className="form-control" value='2022-08-23'></input>
                                </div>
                            </div>
                        </div> 
                    </div>
                    <div className="col-md-4 bg-white rounded">
                            <ExpensesHistory/>
                    </div>
                </div>

            </div>
    </Layout>)
}