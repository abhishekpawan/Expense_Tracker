import { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpenses from "./components/NewExpense/NewExpenses";

const App = () => {
  const [expenses, setExpenses] = useState([
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
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
      date: new Date(2021, 2, 28),
    },
    {
      id: "e4",
      title: "New Desk (Wooden)",
      amount: 450,
      date: new Date(2021, 5, 12),
    },
  ]);

  //Adding new expense from expense form
  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  
  //delete expense
  const deleteExpense = (expenseId) => {
    setExpenses(expenses.filter((expense) => expense.id !== expenseId));
  };
  
  //sending the data of sected expense to edit
  // const [editedExpenseData, setEditedExpenseData] = useState([{

  // }

  // ]);

  //sending back the id of selected expense
  const [editedExpenseId, setEditExpenseId] = useState();
  const editExpenseId = (expenseId) => {
    setEditExpenseId(expenseId);
    // setEditedExpenseData(expenses.filter((expense)=>expense.id === expenseId))
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
    <div>
      <NewExpenses onAddExpense={addExpenseHandler} />
      <Expenses
        items={expenses}
        onDelete={deleteExpense}
        onEdit={editExpenseId}
        editExpenseId={editedExpenseId}
        // editExpenseData={editedExpenseData}
        onSaveEditedExpenseData={saveEditedExpenseDataHandler}
      />
    </div>
  );
};

export default App;
