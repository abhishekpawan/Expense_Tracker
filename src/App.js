import React, { createContext, useState, useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/LoginSignup/Login";
import Register from "./components/LoginSignup/Register";
import "./App.css";

import "antd/dist/antd.css";
import { message, notification} from "antd";


export const expenseData = createContext();

const App = () => {
  const navigate = useNavigate()
  const [apiCall, setApiCall] = useState();
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(userData ? userData : null);
  const [isUserLoggedIn, setUserLoggedin] = useState(user ? true : false);
  const [isSpinning, setSpinning] = useState(false);
  const popupMsg = useRef();

  useEffect(() => {
    if (isUserLoggedIn === false) {
      navigate("/login");
    }
  }, [isUserLoggedIn]);

  const URL = "https://ink-cottony-licorice.glitch.me/api/expenses/all?sortBy=date:desc";
  const INCOME_URL = "https://ink-cottony-licorice.glitch.me/api/incomes/all";

  var today = new Date();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCurrentYear = today.getFullYear();
  const month = monthNames[today.getMonth()];
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(getCurrentYear);

  useEffect(() => {
    setSpinning(true);
    const fetchExpenses = async () => {
      await fetch(URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if(data.msg){
           return setExpenses([data])
          }
          setExpenses(data);
          setSpinning(false);
        });
    };
    const fetchIncomes = async () => {
      await fetch(INCOME_URL, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setIncomes(data);
          setSpinning(false);
        });
    };
    fetchExpenses();
    fetchIncomes();
  }, [apiCall, isUserLoggedIn]);

  const notificationPopup = (NotificationType) => {
    notification[NotificationType]({
      message: `${popupMsg.current}`,
  });
  };

  return (
    <React.Fragment>
      <expenseData.Provider
        value={{
          expenses, setExpenses,
          selectedYear, setSelectedYear,
          selectedMonth, setSelectedMonth,
          user, setUser,
          isUserLoggedIn, setUserLoggedin,
          apiCall, setApiCall,
          isSpinning, setSpinning,
          incomes, setIncomes,
          popupMsg, notificationPopup,
        }}
      >
        {/* {isUserLoggedIn && <Header />} */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </expenseData.Provider>
    </React.Fragment>
  );
};

export default App;
