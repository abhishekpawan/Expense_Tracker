import React from 'react'
import './Balance.css'

const Balance = (props) => {

    return (
        <React.Fragment>
            <div className="container">
            <div className="row">
                <div className="col-4">
                    <h5>Income: ₹ {props.enteredIncome}.00</h5>
                </div>
                <div className="col-4">
                <h5>Expense: ₹ 00.00</h5>
                </div>
                <div className="col-4">
                <h5>Balance: ₹ 00.00</h5>
                </div>
            </div>
            </div> 
        </React.Fragment>
    )
}

export default Balance
