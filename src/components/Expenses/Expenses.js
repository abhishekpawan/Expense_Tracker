import { useContext } from "react";
import { expenseData } from "../../App";
import ExpenseItem from "./ExpenseItem";
import ExpensesFilterByYear from "./ExpensesFilterByYear";
import ExpensesFilterByMonth from "./ExpensesFilterByMonth";
import ExpensesChart from "./ExpensesChart";
import Balance from "./Balance";

import NewExpenses from "../NewExpense/NewExpenses";

const Expenses = () => {
  const { expenses, incomes, selectedYear, selectedMonth } =
    useContext(expenseData);

  //filtering expenses according to year
  const filteredExpenses = expenses.filter((expense) => {
    return new Date(expense.date).getFullYear() === parseInt(selectedYear);
  });

  //filtering incomes according to year
  const filteredIncomes = incomes.filter((income) => {
    return income.year === parseInt(selectedYear);
  });

  //filtering expenses according to Month
  const filteredExpensesByMonth = filteredExpenses.filter((expense) => {
    return (
      new Date(expense.date).toLocaleString("en-US", { month: "long" }) ===
      selectedMonth
    );
  });

  //filtering incomes according to Month
  const filteredIncomesByMonth = filteredIncomes.filter((income) => {
    return (
      new Date(`${income.year}, ${income.month}, 21`).toLocaleString("en-US", {
        month: "long",
      }) === selectedMonth
    );
  });

  //sending income amount data to balance.js
  const expenseAmount = filteredExpensesByMonth.map((amount) => {
    return amount.amount;
  });

  //adding conditional content when there is no expense to show
  let expenseContent;
  if (filteredExpensesByMonth.length > 0) {
    expenseContent = filteredExpensesByMonth.map((expense) => (
      <ExpenseItem
        key={expense._id}
        id={expense._id}
        title={expense.title}
        amount={expense.amount}
        date={expense.date}
      />
    ));
  } else if (filteredExpensesByMonth.length === 0) {
    expenseContent = 
    <div className="expense-item no-expense">
    No Expenses Found!</div>;
  }

  return (
    <div className="main-content ">
      <div className="options row">
        <div className="col-12 col-sm-8">
          <Balance
            incomes={filteredIncomesByMonth}
            expenseAmount={expenseAmount}
          />
        </div>
        <div className="col-4 d-block d-sm-none">
        </div>
        <div className="col-4 col-sm-2">
          <ExpensesFilterByYear />
        </div>
        <div className="col-4 col-sm-2">
          <ExpensesFilterByMonth />
        </div>
      </div>
      <div className="chart-and-addExpense row">
        <div className="col-12 col-lg-8">
          <ExpensesChart expenses={filteredExpenses} />
        </div>
        <div className="abc col-12 col-lg-4 ">
          <NewExpenses />
        </div>
      </div>

      {expenseContent}
    </div>
  );
};

export default Expenses;
