import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { expenseData } from "../App";
import Expenses from "./Expenses/Expenses";
import NewExpenses from "./NewExpense/NewExpenses";
import { BiLoader } from "react-icons/bi";


const Home = () => {
  const navigate = useNavigate();
  const {
    expenses,
    setExpenses,
    isUserLoggedIn,isSpinning, SetIsSpinning
  } = useContext(expenseData);

  console.log(expenses);

  useEffect(() => {
    if (isUserLoggedIn === false) {
      navigate("/login");
    }
  }, [isUserLoggedIn]);

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
      {isSpinning?<BiLoader/>:''}
      <NewExpenses
        onAddExpense={addExpenseHandler}
        onIncomeData={incomeDataHandler}
      />
      <Expenses
        // items={expenses}
        onDelete={deleteExpense}
        onEdit={editExpenseId}
        editExpenseId={editedExpenseId}
        editExpenseData={editedExpenseData}
        onSaveEditedExpenseData={saveEditedExpenseDataHandler}
        // enteredIncome={incomeData}
      />
    </React.Fragment>
  );
};

export default Home;
