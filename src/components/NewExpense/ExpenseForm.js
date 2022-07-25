import React, { useContext, useState } from "react";
import { expenseData } from "../../App";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";


const ExpenseForm = () => {
  const {
    setExpenses,
    user,
    apiCall,
    setApiCall,
    popupMsg,
    notificationPopup, isSpinning, setSpinning
  } = useContext(expenseData);
  const today = new Date();
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState(convertDate(today));

  const URL = "https://ink-cottony-licorice.glitch.me/api/expenses/create";

  // const [isSpinning, setSpinning] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  }

  const submitHandler = (e) => {
    setSpinning(true)

    e.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: parseFloat(enteredAmount).toFixed(2),
      date: new Date(enteredDate),
    };

    async function creatingExpense() {
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
        //setting notification pop
        popupMsg.current = data.error;
        notificationPopup("error");
        setSpinning(false)

      } else {
        setExpenses((prevExpense) => [data,...prevExpense]);

        //setting notification pop
        popupMsg.current = "Expense added!";
        notificationPopup("success");
        setSpinning(false)


        setApiCall(apiCall + 1);
      }
    }
    creatingExpense();

    // Clearing the form fields after submission
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate(convertDate(today));
  };

  const cancelHandler = () => {
    setEnteredTitle("");
    setEnteredAmount("");
    // setEnteredDate(new Date());
    // setIsValidTitle(true);
  };

  return (
    <React.Fragment>
            {/* <Spin indicator={antIcon} spinning={isSpinning}> */}

      <div className="modal fade" id="expense-form">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={submitHandler}>
              <div className="new-expense__controls row">
                <div className="col-12 new-expense__control">
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
                <div className="col-6 new-expense__control">
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
                  <input
                    required
                    type="date"
                    min="2019-01-01"
                    max="2022-12-31"
                    value={convertDate(enteredDate)}
                    placeholder="Enter Date"
                    onChange={(e) => {
                      setEnteredDate(e.target.value);
                    }}
                  />
                </div>
                <div className="modal-footer col-12 mt-4 button">
                  <button
                    className="add-expense"
                    data-bs-dismiss="modal"
                    type="submit"
                  >
                    Add Expense
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    onClick={cancelHandler}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#expense-form"
      >
        Add Expense
      </button>
      {/* </Spin> */}
    </React.Fragment>
  );
};

export default ExpenseForm;
