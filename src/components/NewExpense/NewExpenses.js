import ExpenseForm from './ExpenseForm'
import './NewExpenses.css'

const NewExpenses = (props) => {

    // passing the data from child to parent using function prop
    const saveExpenseDataHandler= (enteredExpenseData) => {
        const expenseData ={
            ...enteredExpenseData,
            id: Math.random().toString()
        }; 
        props.onAddExpense(expenseData);
    };

    return (
        <div className="new-expense">
            <ExpenseForm onSaveExpenseData={saveExpenseDataHandler}/>
        </div>
    )
}

export default NewExpenses
