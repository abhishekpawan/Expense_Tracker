import React from 'react'
import './Balance.css'

const Balance = (props) => {

    //taking the expense amount, then adding them using map(), to show total expense
    var expenseAmount=0;
    props.expenseAmount.map((amount)=>{
      return  expenseAmount=expenseAmount+amount;
    })

    //subtracting income and total expense to show balance

    var balance=props.enteredIncome-expenseAmount;



    return (
        <React.Fragment>
            <div className="container">
            <div className="row">
                <div className="col-4">
                    <h5>Income: {props.enteredIncome}</h5>
                </div>
                <div className="col-4">
                <h5>Total Expense: {expenseAmount}</h5>
                </div>
                <div className="col-4">
                <h5>Balance: {balance}</h5>
                </div>
            </div>
            </div> 
        </React.Fragment>
    )
}

export default Balance
