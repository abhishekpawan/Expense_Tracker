import { useRef } from "react";
import { FaEdit } from "react-icons/fa";
import "./EditExpense.css";
// import ExpenseItem from './ExpenseItem'

const EditExpense = (props) => {
  const title = useRef();
  const amount = useRef();
  const date = useRef();

  //sending edit expense id
  const editHandler = () => {
    props.onEdit(props.data.id);
  };

  var oldTitle = props.editExpenseData[0].title;
  var oldAmount = props.editExpenseData[0].amount;

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [d.getFullYear(), pad(d.getMonth() + 1), pad(d.getDate())].join("-");
  }

  var oldDate = convertDate(props.editExpenseData[0].date);

  const submitHandler = (e) => {
    e.preventDefault();

    const editedExpenseData = {
      title: title.current.value,
      amount: parseInt(amount.current.value),
      date: new Date(date.current.value),
      id: props.editExpenseId,
    };

    //sending edited expense data
    props.onSaveEditedExpenseData(editedExpenseData);
  };
  const cancelHandler = () => {
    title.current.value = "";
    amount.current.value = "";
    date.current.value = "";
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
            <form onSubmit={submitHandler} key={props.editExpenseId}>
              <div className="new-expense__controls">
                <div className="col-7 new-expense__control">
                  <label>Title</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Title"
                    ref={title}
                    value={oldTitle}
                  ></input>
                </div>
                <div className="col-5 new-expense__control">
                  <label>Amount</label>
                  <input
                    type="number"
                    required
                    min="0.01"
                    step="0.01"
                    ref={amount}
                    value={oldAmount}
                    placeholder="Enter Amount"
                  />
                </div>
                <div className="col-6 new-expense__control">
                  <label>Date</label>
                  <input
                    type="date"
                    required
                    min="2019-01-01"
                    max="2022-12-31"
                    ref={date}
                    value={oldDate}
                    // Value={props.editExpenseData[0].date}
                    placeholder="Enter Date"
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
