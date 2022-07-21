import { useContext, useState } from "react";
import { expenseData } from "../../App";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const { expenses, setExpenses, user, apiCall, setApiCall } =
    useContext(expenseData);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  const URL = "http://localhost:5000/api/expenses/create";

  // Adding data from the form in a object
  const submitHandler = (e) => {
    e.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: parseInt(enteredAmount),
      date: new Date(enteredDate),
    };

    async function creatingExpense() {
      // POST request using fetch with async/await
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(expenseData),
      };
      const response = await fetch(URL, requestOptions);
      const data = await response.json();
      if (data.error) {
        return alert(data.error);
      }
      setExpenses(prevExpense=>[...prevExpense, data])

      setApiCall(apiCall + 1);
    }
    creatingExpense();

    // Clearing the form fields after submission
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
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
              <div className="new-expense__controls">
                <div className="col-7 new-expense__control">
                  <label>Title</label>

                  <input
                    required
                    type="text"
                    value={enteredTitle}
                    placeholder="Enter Title"
                    onChange={(e) => {
                      setEnteredTitle(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setEnteredAmount(e.target.value);
                    }}
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
                    onChange={(e) => {
                      setEnteredDate(e.target.value);
                    }}
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
