import React, { useState, useContext } from "react";
import { expenseData } from "../../App";
import { FaTimes } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const ExpenseItem = (props) => {
  const { expenses, setExpenses, popupMsg, notificationPopup, user } =
    useContext(expenseData);
  const [title, setTitle] = useState(props.title);
  const [amount, setAmount] = useState(parseFloat(props.amount).toFixed(2));
  const [date, setDate] = useState(props.date);
  const [isExpenseEditable, setExpneseEditable] = useState(false);

  const URL = "https://ink-cottony-licorice.glitch.me/api/expenses/";
  const [isSpinning, setSpinning] = useState(false);
  const antIcon = (
    <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  );

  const deleteHandler = () => {
    setSpinning(true)

    fetch(URL + props.id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          //setting notification pop
          popupMsg.current = data.error;
          notificationPopup("error");
          setSpinning(false)

        } else {
          console.log(data.msg);
          const updatedExpenses = expenses.filter((expense) => {
            return expense._id !== data.expense._id;
          });
          setExpenses(updatedExpenses);
          setSpinning(false)


          //setting notification pop
          popupMsg.current = "Expense Deleted Successfully!";
          notificationPopup("success");
        }
      });
  };

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  }

  const submitHandler = (e) => {
    setSpinning(true)

    e.preventDefault();
    setExpneseEditable(false);
    const editedExpenseData = {
      title,
      amount: parseFloat(amount).toFixed(2),
      date,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
      body: JSON.stringify(editedExpenseData),
    };
    fetch(URL + props.id, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          //setting notification pop
          popupMsg.current = data.error;
          notificationPopup("error");
          setSpinning(false)

        } else {
          const updatedExpenses = expenses.filter((expense) => {
            return expense._id !== data._id;
          });

          updatedExpenses.unshift(data);

          setExpenses(updatedExpenses);
          setSpinning(false)


          //setting notification pop
          popupMsg.current = "Expense Edited SuccesFully!";
          notificationPopup("success");
        }
      });
  };
  const cancelHandler = () => {
    setExpneseEditable(false);
  };

  const month = new Date(props.date).toLocaleString("en-US", { month: "long" });
  const year = new Date(props.date).getFullYear();
  const day = new Date(props.date).getDate();

  return (
    <React.Fragment>
      {isExpenseEditable ? (
        <Spin indicator={antIcon} spinning={isSpinning}>
          <form onSubmit={submitHandler}>
            <div className="expense-item row">
              <div className="col-8 expense-title">
                <input
                  type="text"
                  required
                  placeholder="Enter Title"
                  defaultValue={props.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span className="date">
                  <input
                    type="date"
                    required
                    min="2019-01-01"
                    max="2022-12-31"
                    defaultValue={convertDate(props.date)}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Enter Date"
                  />
                </span>
              </div>
              <div className="col-2 expense-amount">
                <input
                  type="number"
                  required
                  min="0.01"
                  step="0.01"
                  defaultValue={props.amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter Amount"
                />
              </div>
              <div className="col-12 buttons">
                <button
                  type="button"
                  data-bs-dismiss="nodal"
                  onClick={cancelHandler}
                >
                  Cancel
                </button>
                <button
                  className="save-expense"
                  type="submit"
                  data-bs-dismiss="nodal"
                >
                  Save
                </button>
              </div>{" "}
            </div>
          </form>
        </Spin>
      ) : (
        <Spin indicator={antIcon} spinning={isSpinning}>
          <div className="expense-item row">
            <div className="col-8 expense-title">
              <span>{props.title}</span>
              <span className="date">
                {day} {month} {year}
              </span>
            </div>
            <div className="col-4">
              <div className="row">
                <div className="col-12 col-sm-6 expense-amount">
                  ₹ {parseFloat(props.amount).toFixed(2)}
                </div>
                <div className="col-12 col-sm-6 expense-actions">
                  <div
                    className="edit"
                    type="button"
                    onClick={() => setExpneseEditable(true)}
                  >
                    <i className="edit-icon">
                      <FaEdit />
                    </i>
                  </div>

                  <div className="delete">
                    <i className="del-icon" onClick={deleteHandler}>
                      <FaTimes />
                    </i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      )}
    </React.Fragment>
  );
};

export default ExpenseItem;
