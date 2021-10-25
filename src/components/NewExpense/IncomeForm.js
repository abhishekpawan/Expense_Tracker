import { useRef } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const income = useRef();

  // Adding data from the form in a object
  const submitHandler = (e) => {
    e.preventDefault();

    const enteredIncome = parseFloat(income.current.value).toFixed(2);

    // passing the income to parent 
    props.onIncomeData(enteredIncome);
    income.current.value='';

  };

  

  const cancelHandler = () => {
      income.current.value='';
  };

  return (
    <div>
      <div className="modal fade" id="income-form">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={submitHandler}>
              <div className="new-expense__controls">
                <div className=" new-expense__control">
                  <label>Income (in ₹)</label>
                  <input
                    type="number"
                    min="1"
                    step="any"
                    placeholder="Enter Your Income"
                    required
                    ref={income}
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
                    Add Income
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="new-expense__actions">
        <button
          className="ms-2"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#income-form"
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default ExpenseForm;
