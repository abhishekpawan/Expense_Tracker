import './ExpensesFilter.css'


const ExpensesFilter = (props) => {
const dropdownChangeHandler=(e)=>{
    props.onChangeFilter(e.target.value);
}

    return (
        <div className="expenses-filter">
            <div className="expenses-filter__control">
                <label>Filter by Year</label>
                <select value={props.selected} onChange={dropdownChangeHandler}>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                </select>
            </div>            
        </div>
    )
}

export default ExpensesFilter
