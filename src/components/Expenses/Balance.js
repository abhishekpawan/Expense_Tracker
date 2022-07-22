import React, { useState, useContext, useEffect } from "react";
import { expenseData } from "../../App";
import { FaEdit } from "react-icons/fa";
import { FaCheckSquare } from "react-icons/fa";

const Balance = (props) => {
  const [updatedIncome, setUpdatedIncome] = useState(props.incomes[0]?.income);
  const [isIncomeEditable, setIncomeEditable] = useState(false);

  const {
    incomes,
    setIncomes,
    user,
    selectedMonth,
    selectedYear,
    popupMsg,
    notificationPopup,
  } = useContext(expenseData);

  const URL = "https://ink-cottony-licorice.glitch.me/api/incomes/create";
  //convertinng month name to number
  function getMonthFromString(mon) {
    return new Date(Date.parse(mon + " 1, 2022")).getMonth() + 1;
  }

  const submitIncomeHandler = (e) => {
    e.preventDefault();

    const enteredIncome = {
      income: (updatedIncome === undefined)
        ? props.incomes[0]?.income
        : parseFloat(updatedIncome).toFixed(2),
      month: getMonthFromString(selectedMonth),
      year: selectedYear,
    };
    console.log(enteredIncome);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(enteredIncome),
    };
    fetch(URL, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          //setting notification pop
          popupMsg.current = data.error;
          notificationPopup("error");
        } else {
          const updatedIncomeArray = incomes.filter((income) => {
            return income._id !== data._id;
          });

          updatedIncomeArray.push(data);
          setIncomes(updatedIncomeArray);
          setIncomeEditable(false);

          //setting notification pop
          popupMsg.current = "Income updated!";
          notificationPopup("success");
        }
      });
  };

  //taking the expense amount, then adding them using map(), to show total expense
  var expenseAmount = 0;
  props.expenseAmount.map((amount) => {
    return (expenseAmount = expenseAmount + amount);
  });

  //subtracting income and total expense to show balance
  var balance;
  var income;
  if (props.incomes[0]?.income) {
    income = props.incomes[0]?.income;
    balance = income - expenseAmount;
  } else {
    balance = 0 - expenseAmount;
    income = 0;
  }

  return (
    <React.Fragment>
      <div className="balances row">
        <div className="col-4">
          <p className="income">
            <span>Income:</span>
            <span className="money">
              ₹
              {isIncomeEditable ? (
                <input
                  type="number"
                  defaultValue={parseFloat(income).toFixed(2)}
                  onChange={(e) => setUpdatedIncome(e.target.value)}
                />
              ) : (
                parseFloat(income).toFixed(2)
              )}
              {isIncomeEditable ? (
                <i className="edit-icon" onClick={submitIncomeHandler}>
                  <FaCheckSquare />
                </i>
              ) : (
                <i
                  className="edit-icon"
                  onClick={() => setIncomeEditable(true)}
                >
                  <FaEdit />
                </i>
              )}
            </span>
          </p>
        </div>
        <div className="col-4">
          <p className="total-expense">
            <span>Expense:</span>
            <span className="money">
              ₹{parseFloat(expenseAmount).toFixed(2)}
            </span>
          </p>
        </div>
        <div className="col-4">
          <p className="balance">
            <span>Balance:</span>
            <span className="money">₹{parseFloat(balance).toFixed(2)}</span>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Balance;
