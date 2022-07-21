import React,{useContext} from 'react'
import { expenseData } from '../App';
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
  const { expenses, setExpenses,user,isUserLoggedIn,setUserLoggedin } = useContext(expenseData);

const logoutHandler = () =>{
    localStorage.removeItem("user");
    setUserLoggedin(false);
    navigate("/login");

}
  return (
    <React.Fragment>
        <div className='row'>
            <div className='col-3'>
                <h4>{user.name}</h4>
            </div>
            <div className='col-3'>
                <h4>{user.email}</h4>
            </div>
            <div className='col-3'>
                
            </div>
            <div className='col-3'>
                <button onClick={logoutHandler}>Logout</button>
            </div>
        </div>

    </React.Fragment>
  )
}

export default Header