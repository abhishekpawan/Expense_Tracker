import { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilterByYear from "./ExpensesFilterByYear";
import ExpensesFilterByMonth from "./ExpensesFilterByMonth";
import ExpensesChart from "./ExpensesChart";
import Balance from "./Balance";


import "./Expenses.css";

const Expenses = (props) => {

  var today = new Date();

  const getCurrentYear = today.getFullYear(); 
  
  //filtering expenses according to year
  const [filteredYear, setFilteredYear] = useState(getCurrentYear);

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filteredExpenses = props.items.filter((expense) => {

    return expense.date.getFullYear().toString() === filteredYear;
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  ];
  var month=monthNames[today.getMonth()]

  //filtering expenses according to Month
  const [filteredMonth, setFilteredMonth] = useState(month);

  const filterMonthChangeHandler = (selectedMonth) => {
    setFilteredMonth(selectedMonth);
  };

  const filteredExpensesByMonth = filteredExpenses.filter((expense) => {
    return expense.date.toLocaleString('en-US', {month:'long'}) === filteredMonth;
  });

   //filtering income according to year
   let filterIncome = '00';
   if(props.enteredIncome[2]===filteredYear ){
     filterIncome= props.enteredIncome[0];
   }
 

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

  //sending income amount data to balance.js
  const expenseAmount = filteredExpensesByMonth.map((amount)=>{
    return amount.amount;
  })

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
      <Balance 
        enteredIncome={filterIncome}
        expenseAmount={expenseAmount}
        />
      
      <ExpensesChart expenses={filteredExpenses} />
      {expenseContent}
    </div>
  );
};

export default Expenses;
