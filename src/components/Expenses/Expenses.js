import { useState, useContext } from "react";
import { expenseData } from "../../App";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilterByYear from "./ExpensesFilterByYear";
import ExpensesFilterByMonth from "./ExpensesFilterByMonth";
import ExpensesChart from "./ExpensesChart";
import Balance from "./Balance";

import "./Expenses.css";

const Expenses = (props) => {
  const { expenses, setExpenses } = useContext(expenseData);
  var today = new Date();

  const getCurrentYear = today.getFullYear();

  //filtering expenses according to year
  const [filteredYear, setFilteredYear] = useState(getCurrentYear);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = expenses.filter((expense) => {
    return new Date(expense.date).getFullYear() === parseInt(filteredYear);
  });

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var month = monthNames[today.getMonth()];

  //filtering expenses according to Month
  const [filteredMonth, setFilteredMonth] = useState(month);

  const filterMonthChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };

  const filteredExpensesByMonth = filteredExpenses.filter((expense) => {
    return (
      new Date(expense.date).toLocaleString("en-US", { month: "long" }) === filteredMonth
    );
  });

  //sending edit expense id
  const editExpenseId = (expenseId) => {
    props.onEdit(expenseId);
  };

  //geeting edited expense data
  const saveEditedExpenseDataHandler = (editedExpenseData) => {
    props.onSaveEditedExpenseData(editedExpenseData);
  };

  //adding conditional content when there is no expense to show
  let expenseContent
  if (filteredExpensesByMonth.length > 0) {
    expenseContent = filteredExpensesByMonth.map((expense) => (
      <ExpenseItem
        key={expense._id}
        id={expense._id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
        onEdit={editExpenseId}
        editExpenseId={props.editExpenseId}
        editExpenseData={props.editExpenseData}
        onSaveEditedExpenseData={saveEditedExpenseDataHandler}
      />
    ));
  } else if(filteredExpensesByMonth.length === 0) {
    expenseContent = <p>No Expenses Found!</p>;
  }

  //sending income amount data to balance.js
  const expenseAmount = filteredExpensesByMonth.map((amount) => {
    return amount.amount;
  });

  return (
    <div className="expenses">
      <ExpensesFilterByYear
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesFilterByMonth
        selected={filteredMonth}
        onChangeFilter={filterMonthChangeHandler}
      />
      <Balance enteredIncome={'2000'} expenseAmount={expenseAmount} />

      <ExpensesChart expenses={filteredExpenses} />
      {expenseContent}
    </div>
  );
};

export default Expenses;
