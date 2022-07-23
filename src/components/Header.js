import React, { useContext } from "react";
import { expenseData } from "../App";
import { useNavigate } from "react-router-dom";

import titleImage from "../assets/2ndtitle.png"

const Header = () => {
  const navigate = useNavigate();
  const { setExpenses,user, setUserLoggedin, popupMsg, notificationPopup } =
    useContext(expenseData);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    setUserLoggedin(false);
    setExpenses([])
    navigate("/login");

    //setting notification pop
    popupMsg.current = "You have been Logged-out";
    notificationPopup("success");
  };
  return (
    <React.Fragment>
      <div className="header row">
          <div className="col-12 col-sm-6 title">
            <img src={titleImage} alt="titleimage"/>
          </div>
          <div className="col-12 col-sm-6 userDetails">
            <p className="username"><span>Welcome, </span>{user?.name}</p>
            <p className="email">{user?.email}</p>
            <button className="btn-4" onClick={logoutHandler}>Logout</button>
          </div>
        </div>
    </React.Fragment>
  );
};

export default Header;
