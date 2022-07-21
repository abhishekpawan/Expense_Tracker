import React from "react";
import { useState,useRef,useEffect } from "react";
import { faCheck,faTimes,faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./LoginSignup.css";

const LoginSignup = () => {

//toggle signin and signuo form
  const [toggleFormState, setToggleFormState] = useState(false);

  const toggleFormSignup = () => {
      setToggleFormState(true)
  };
  const toggleFormSignin = () => {
    setToggleFormState(false)
};


//form validation 
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}/;


 
  return (
    <React.Fragment>
      <section>
        <div className={toggleFormState ? "container active" : "container"}>
          <div className="user signinBx">
            <div className="imgBx">
              <img
                src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg"
                alt=""
              />
            </div>
            <div className="formBx">
              <form action="" onSubmit="return false;">
                <h2>Sign In</h2>
                <input type="text" name="" placeholder="Username" />
                <input type="password" name="" placeholder="Password" />
                <input type="submit" name="" value="Login" />
                <p className="signup">
                  Don't have an account ?
                  <a href="#" onClick={toggleFormSignup}>
                    Sign Up.
                  </a>
                </p>
              </form>
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <form action="" onSubmit="return false;">
                <h2>Create an account</h2>
                <input type="text" name="" placeholder="Username" />
                <input type="email" name="" placeholder="Email Address" />
                <input type="password" name="" placeholder="Create Password" />
                <input type="password" name="" placeholder="Confirm Password" />
                <input type="submit" name="" value="Sign Up" />
                <p className="signup">
                  Already have an account ?
                  <a href="#" onClick={toggleFormSignin}>
                    Sign in.
                  </a>
                </p>
              </form>
            </div>
            <div className="imgBx">
              <img
                src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default LoginSignup;
