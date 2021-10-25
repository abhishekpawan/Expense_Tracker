import ExpenseForm from './ExpenseForm'
import IncomeForm from './IncomeForm'
import './NewExpenses.css'

const NewExpenses = (props) => {

    // passing the data from child to parent using function prop
    const saveExpenseDataHandler= (enteredExpenseData) => {
        const expenseData ={
            ...enteredExpenseData,
            id: Math.random().toString()
        }; 
        // console.log(expenseData)
        props.onAddExpense(expenseData);
    };

    //passing the enetered income from child to parent 

    const incomeDataHandler = (enteredIncome)=>{
        const incomeData = enteredIncome

        props.onIncomeData(incomeData);
    }

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
            <IncomeForm onIncomeData={incomeDataHandler}/>
        </div>
    )
}

export default NewExpenses
