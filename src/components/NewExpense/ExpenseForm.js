import { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  // using multiplel useStates
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  // using single usestates
  // const [userInput, setUserInput]=useState({
  //     enteredTitle: '',
  //     enteredAmount: '',
  //     enteredDate:''
  // })

  // whenver if we depend on prevous state to update value we use this fuction form --

  // setUserInput ((prevState) => {
  //     return {...prevState, enteredTitle: e.target.value};
  // });

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
    // setUserInput({
    //     ...userInput,
    //     enteredTitle: e.target.value,
    // })
  };
  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
    // setUserInput({
    //     ...userInput,
    //     enteredAmount: e.target.value,
    // })
  };
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
    // setUserInput({
    //     ...userInput,
    //     enteredDate: e.target.value,
    // })
  };

  // Adding data from the form in a object
  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    
    // passing the data to parent through the "onSaveExpenseData" function
    props.onSaveExpenseData(expenseData); 

    // Clearing the form fields after submission
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };



  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            value={enteredTitle}
            placeholder="Enter Title"
            onChange={titleChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            placeholder="Enter Amount"
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            placeholder="Enter Date"
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
