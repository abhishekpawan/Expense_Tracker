import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import "./EditExpense.css";
// import ExpenseItem from './ExpenseItem'

const EditExpense = (props) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");


  //sending edit expense id
  const editHandler = () => {
    props.onEdit(props.data.id);
  };


  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const amountHandler = (e) => {
    setAmount(e.target.value);
  };
  const dateHandler = (e) => {
    setDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if(title.length === 0 ||
      amount.length === 0 ||
      date.length === 0){
      alert("Please Make Some Change")
      }

      else{

        const editedExpenseData = {
          title: title,
          amount: parseInt(amount),
          date: new Date(date),
          id: props.editExpenseId,
        };
        // console.log(editedExpenseData)
        //sending edited expense data
        props.onSaveEditedExpenseData(editedExpenseData);
        setTitle("");
        setAmount("");
        setDate("");
      }
    
  };
  const cancelHandler = () => {
    setTitle("");
    setAmount("");
    setDate("");
  };

  return (
    <div>
      <div
        className="edit"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#edit-form"
        onClick={editHandler}
      >
        edit
        <i className="edit-icon">
          <FaEdit />
        </i>
      </div>

      <div className="modal fade" id="edit-form">
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={submitHandler}>
              <div className="new-expense__controls">
                <div className="col-7 new-expense__control">
                  <label>Title</label>
                  <input
                    type="text"
                    value={title}
                    placeholder="Enter Title"
                    onChange={titleHandler}
                  ></input>
                </div>
                <div className="col-5 new-expense__control">
                  <label>Amount</label>
                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={amount}
                    placeholder="Enter Amount"
                    onChange={amountHandler}
                  />
                </div>
                <div className="col-6 new-expense__control">
                  <label>Date</label>
                  <input
                    type="date"
                    min="2019-01-01"
                    max="2022-12-31"
                    value={date}
                    // Value={props.editExpenseData[0].date}
                    placeholder="Enter Date"
                    onChange={dateHandler}
                  />
                </div>
                <div className="modal-footer col-12 mt-4 button">
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    onClick={cancelHandler}
                  >
                    Cancel
                  </button>
                  <button
                    className="save-expense"
                    type="submit"
                    data-bs-dismiss="modal"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExpense;
