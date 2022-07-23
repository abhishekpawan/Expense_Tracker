import React, { useState,useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { expenseData } from "../App";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Expenses from "./Expenses/Expenses";
import Header from "./Header";
import Footer from "./Footer";

const Home = () => {
  const navigate = useNavigate();
  const {expenses, isUserLoggedIn } = useContext(expenseData);
  const [isSpinning, setSpinning] = useState(true);
  const antIcon = <LoadingOutlined style={{ fontSize: 24, color: "#ff4400" }} spin />
  useEffect(() => {
    if (expenses.length > 0 || expenses.msg) {
      setSpinning(false);
    } else setSpinning(true);
  }, [expenses]);

  useEffect(() => {
    if (isUserLoggedIn === false) {
      navigate("/login");
    }
  }, [isUserLoggedIn]);

  return (
    <React.Fragment>
      <div className="homeContainer">
        <Spin indicator={antIcon} spinning={isSpinning}>
          <Header />
          <Expenses />
          <Footer />
        </Spin>
      </div>
    </React.Fragment>
  );
};

export default Home;
