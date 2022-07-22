import { useContext } from "react";
import { expenseData } from "../../App";

const ExpensesFilter = () => {
  const { selectedYear, setSelectedYear } = useContext(expenseData);
  const dropdownChangeHandler = (e) => {
    setSelectedYear(e.target.value);
  };

  return (
    <div className="expenses-filter year">
        <select value={selectedYear} onChange={dropdownChangeHandler}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
        </select>
    </div>
  );
};

export default ExpensesFilter;
