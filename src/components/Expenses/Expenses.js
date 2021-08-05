import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesChart from "./ExpensesChart";

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
  if (filteredExpenses.length > 0) {
    expenseContent = filteredExpenses.map((expense) => (
      <ExpenseItem
        key={expense.id}
        id={expense.id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
        onDelete={deleteExpenseId}
        onEdit={editExpenseId}
        editExpenseId={props.editExpenseId}
        // editExpenseData={props.editExpenseData}
        onSaveEditedExpenseData={saveEditedExpenseDataHandler}
      />
    ));
  }
  // <EditExpense data2={"rrr"}/>

  return (
    <div className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      {expenseContent}
    </div>
  );
};

export default Expenses;
