import React, { useState } from "react";
import Expenses from "./Expenses/Expenses";
import NewExpenses from "./NewExpense/NewExpenses";

const Home = () => {
  const [expenses, setExpenses] = useState([
    {
      id: "e0",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2021, 0, 14),
    },
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2021, 1, 14),
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 2, 12),
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2021, 3, 28),
    },
    {
      id: "e4",
      title: "New Desk1 (Wooden)",
      amount: 450,
      date: new Date(2021, 4, 12),
    },
    {
      id: "e5",
      title: "New Desk2 (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
    {
      id: "e6",
      title: "New Desk3 (Wooden)",
      amount: 450,
      date: new Date(2021, 6, 12),
    },
    {
      id: "e7",
      title: "New Desk4 (Wooden)",
      amount: 450,
      date: new Date(2021, 7, 12),
    },
    {
      id: "e8",
      title: "New Desk5 (Wooden)",
      amount: 450,
      date: new Date(2021, 8, 12),
    },
    {
      id: "e9",
      title: "New Desk6 (Wooden)",
      amount: 450,
      date: new Date(2021, 9, 12),
    },
    {
      id: "e10",
      title: "New Desk7 (Wooden)",
      amount: 450,
      date: new Date(2021, 10, 12),
    },
    {
      id: "e11",
      title: "New Desk8 (Wooden)",
      amount: 450,
      date: new Date(2021, 11, 12),
    },
  ]);

  //Adding new expense from expense form
  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  //geeting the entered income
  const [income, setIncome] = useState("00");

  const incomeDataHandler = (income) => {
    setIncome((prevIncome) => {
      return [parseFloat(income) + parseFloat(prevIncome)];
    });
  };

  //getting curent date to attach with incomeDATA(object)
  const current = new Date();
  const month = current.getMonth() + 1;
  const year = current.getFullYear();

  var incomeData = [income, month, year];

  //delete expense
  const deleteExpense = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };

  //sending the data of sected expense to edit
  const [editedExpenseData, setEditedExpenseData] = useState([{}]);

  //sending back the id of selected expense
  const [editedExpenseId, setEditExpenseId] = useState();
  const editExpenseId = (expenseId) => {
    setEditExpenseId(expenseId);
    setEditedExpenseData(
      expenses.filter((expense) => expense.id === expenseId)
    );
  };

  //geeting edited expense data
  const saveEditedExpenseDataHandler = (editedExpenseData) => {
    //removing the selected expense
    setExpenses(
      expenses.filter((expense) => expense.id !== editedExpenseData.id)
    );

    //storing the edited expense data into a varaibble
    const editedExpense = {
      id: editedExpenseData.id,
      title: editedExpenseData.title,
      amount: editedExpenseData.amount,
      date: editedExpenseData.date,
    };
    //adding the edited expense data into the orignal expense array
    setExpenses((prevExpenses) => {
      return [editedExpense, ...prevExpenses];
    });
  };
  return (
    <React.Fragment>
      <NewExpenses
        onAddExpense={addExpenseHandler}
        onIncomeData={incomeDataHandler}
      />
      <Expenses
        items={expenses}
        onDelete={deleteExpense}
        onEdit={editExpenseId}
        editExpenseId={editedExpenseId}
        editExpenseData={editedExpenseData}
        onSaveEditedExpenseData={saveEditedExpenseDataHandler}
        enteredIncome={incomeData}
      />
    </React.Fragment>
  );
};

export default Home;
