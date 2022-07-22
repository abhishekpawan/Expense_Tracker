import { useContext } from "react";
import { expenseData } from "../../App";

const ExpensesFilter = (props) => {
    const {selectedMonth, setSelectedMonth} = useContext(expenseData)

  const dropdownChangeHandler = (e) => {
    // props.onChangeFilter(e.target.value);
    setSelectedMonth(e.target.value)
  };

  return (
    <div className="expenses-filter month">
        <select value={selectedMonth} onChange={dropdownChangeHandler}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
    </div>
  );
};

export default ExpensesFilter;
