import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { expenseData } from "../App";
import Expenses from "./Expenses/Expenses";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  const { isUserLoggedIn} = useContext(expenseData);

  useEffect(() => {
    if (isUserLoggedIn === false) {
      navigate("/login");
    }
  }, [isUserLoggedIn]);

  return (
    <React.Fragment>
      <div className="homeContainer">
        <Header/>
        <Expenses />
        <Footer/>
      </div>
    </React.Fragment>
  );
};

export default Home;
