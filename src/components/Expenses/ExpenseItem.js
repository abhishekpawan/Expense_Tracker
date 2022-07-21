import { useState, useContext } from "react";
import { expenseData } from "../../App";
import ExpenseDate from "./ExpenseDate";
import { FaTrashAlt } from "react-icons/fa";
import "./ExpenseItem.css";
import EditExpense from "./EditExpense";

const ExpenseItem = (props) => {
  const { expenses, setExpenses, setApiCall, apiCall, user } =
    useContext(expenseData);
  const URL = "http://localhost:5000/api/expenses/";

  const deleteHandler = () => {
    async function creatingExpense() {
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const response = await fetch(URL + props.id, requestOptions);
      const data = await response.json();
      if (data.error) {
        return alert(data.error);
      }
      console.log(data.msg);
      const updatedExpenses = expenses.filter((expense) => {
        return expense._id !== data.expense._id;
      });
      setExpenses(updatedExpenses);

      setApiCall(apiCall + 1);
    }
    creatingExpense();
  };

  //sending edit expense id
  const editExpenseID = (expenseId) => {
    props.onEdit(expenseId);
  };
  //geeting edited expense data
  const saveEditedExpenseDataHandler = (editedExpenseData) => {
    props.onSaveEditedExpenseData(editedExpenseData);
  };

  return (
    <div className="expense-item">
      <ExpenseDate date={props.date} />
      <div className="expense-item__description ">
        <h2 id="title">{props.title}</h2>
        <div className="item-group">
          <div className="expense-item__price">₹ {props.amount}</div>

          <div className="del">
            <EditExpense
              data={props}
              editExpenseId={props.editExpenseId}
              editExpenseData={props.editExpenseData}
              onEdit={editExpenseID}
              onSaveEditedExpenseData={saveEditedExpenseDataHandler}
            />
            <i className="del-icon" onClick={deleteHandler}>
              <FaTrashAlt style={{ color: "white", cursor: "pointer" }} />
            </i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
