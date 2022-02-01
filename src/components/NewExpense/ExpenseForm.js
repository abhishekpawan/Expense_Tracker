import { useState} from "react";
import { FaExclamationTriangle } from "react-icons/fa";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  // using multiplel useStates
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  
  const [isValid, setIsValidTitle] = useState(true);

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
    setIsValidTitle(true);
    // setUserInput({
    //     ...userInput,
    //     enteredTitle: e.target.value,
    // })
  };
  const amountChangeHandler = (e) => {
    setEnteredAmount(e.target.value);
    setIsValidTitle(true);
    // setUserInput({
    //     ...userInput,
    //     enteredAmount: e.target.value,
    // })
  };
  const dateChangeHandler = (e) => {
    setEnteredDate(e.target.value);
    setIsValidTitle(true);
    // setUserInput({
    //     ...userInput,
    //     enteredDate: e.target.value,
    // })
  };

  // Adding data from the form in a object
  const submitHandler = (e) => {
    e.preventDefault();

    if (
      enteredTitle.trim().length === 0 ||
      enteredAmount.trim().length === 0 ||
      enteredDate.length === 0
    ) {
      setIsValidTitle(false);
    } else {
      const expenseData = {
        title: enteredTitle,
        amount: parseInt(enteredAmount),
        date: new Date(enteredDate),
      };

      // passing the data to parent through the "onSaveExpenseData" function
      props.onSaveExpenseData(expenseData);
      // console.log(expenseData);

      // Clearing the form fields after submission
      setEnteredTitle("");
      setEnteredAmount("");
      setEnteredDate("");
    }
  };

  const cancelHandler = () => {
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    // setIsValidTitle(true);
  };

  return (
    <div>
      <div className="modal fade" id="expense-form">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={submitHandler}>
              {/* <div
                className={`alert bg-warning warning ${
                  !isValid ? "" : "d-none"
                }`}
              >
                <h3 className="warning-icon">
                  <FaExclamationTriangle />
                </h3>
                <h3> Please Fill All The Fields!!!</h3>
              </div> */}
              <div className="new-expense__controls">
                <div className="col-7 new-expense__control">
                  <label>Title</label>

                  <input
                    required
                    type="text"
                    value={enteredTitle}
                    placeholder="Enter Title"
                    onChange={titleChangeHandler}
                  />
                </div>
                <div className="col-5 new-expense__control">
                  <label>Amount (in ₹)</label>
                  <input
                    required
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={enteredAmount}
                    placeholder="Enter Amount"
                    onChange={amountChangeHandler}
                  />
                </div>
                <div className="col-6 new-expense__control">
                  <label>Date</label>

                  <input
                    required
                    type="date"
                    min="2019-01-01"
                    max="2022-12-31"
                    value={enteredDate}
                    placeholder="Enter Date"
                    onChange={dateChangeHandler}
                  />
                </div>
                <div className="modal-footer col-12 mt-4 button">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    onClick={cancelHandler}
                  >
                    Cancel
                  </button>
                  <button className="add-expense" type="submit">
                    Add Expense
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
     
      <div className="new-expense__actions">
        <button
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#expense-form"
        >
          Add Expense
        </button>
        
      </div>
    </div>
  );
};

export default ExpenseForm;
