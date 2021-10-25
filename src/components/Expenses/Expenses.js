import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilterByYear from "./ExpensesFilterByYear";
import ExpensesFilterByMonth from "./ExpensesFilterByMonth";
import ExpensesChart from "./ExpensesChart";
import Balance from "./Balance";


import "./Expenses.css";

const Expenses = (props) => {
  //filtering expenses according to year
  const [filteredYear, setFilteredYear] = useState("2021");

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  var today = new Date();
  var month=monthNames[today.getMonth()]
  console.log(month)

  //filtering expenses according to Month
  const [filteredMonth, setFilteredMonth] = useState(month);

  

  const filterMonthChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };

  const filteredExpensesByMonth = filteredExpenses.filter((expense) => {
    return expense.date.toLocaleString('en-US', {month:'long'}) === filteredMonth;
  });


  //delete expense
  const deleteExpenseId = (expenseId) => {
    props.onDelete(expenseId);
  };

  //sending edit expense id
  const editExpenseId = (expenseId) => {
    props.onEdit(expenseId);
  };

  //geeting edited expense data
  const saveEditedExpenseDataHandler = (editedExpenseData) => {
    props.onSaveEditedExpenseData(editedExpenseData)
  };

  //adding conditional content when there is no expense to show
  let expenseContent = <p>No Expenses Found!</p>;
  if (filteredExpensesByMonth.length > 0) {
    expenseContent = filteredExpensesByMonth.map((expense) => (
      <ExpenseItem
        key={expense.id}
        id={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
        onDelete={deleteExpenseId}
        onEdit={editExpenseId}
        editExpenseId={props.editExpenseId}
        editExpenseData={props.editExpenseData}
        onSaveEditedExpenseData={saveEditedExpenseDataHandler}
      />
    ));
  }

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
      <Balance enteredIncome={props.enteredIncome}/>
      
      <ExpensesChart expenses={filteredExpenses} />
      {expenseContent}
    </div>
  );
};

export default Expenses;
