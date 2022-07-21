import React, { createContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/LoginSignup/Login";
import Register from "./components/LoginSignup/Register";

export const expenseData = createContext();

const App = () => {
  const [apiCall, setApiCall] = useState()
  const [expenses, setExpenses] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userData ? userData : null);
  const [isUserLoggedIn, setUserLoggedin] = useState(user ? true : false);
  const [isSpinning, setSpinning] = useState(false)

  const URL = "http://localhost:5000/api/expenses/all";

  useEffect(() => {
    setSpinning(true)
    const fetchData = async () => {
      await fetch(URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
        setExpenses(data)
        setSpinning(false)
        });
    };
    fetchData();
  }, [apiCall,isUserLoggedIn]);

  return (
    <React.Fragment>
      <expenseData.Provider
        value={{
          expenses,
          setExpenses,
          user,
          setUser,
          isUserLoggedIn,
          setUserLoggedin,
          apiCall, setApiCall,isSpinning, setSpinning,
        }}
      >
        {isUserLoggedIn && <Header/>}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </expenseData.Provider>
    </React.Fragment>
  );
};

export default App;
