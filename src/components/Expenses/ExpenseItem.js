// import { useState } from "react";
import ExpenseDate from "./ExpenseDate";
import { FaTrashAlt } from "react-icons/fa";
import "./ExpenseItem.css";
import EditExpense from "./EditExpense";

const ExpenseItem = (props) => {
  //sending edit expense id
  const editExpenseID = (expenseId) => {
    props.onEdit(expenseId);
  };
  //sending delete expense id
  const deleteHandler = () => {
    props.onDelete(props.id);
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
