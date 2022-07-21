import React, { useState } from "react";
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const naviagte = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const URL = "http://localhost:5000/api/users/login";

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    async function registerUser() {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      };
      const response = await fetch(URL, requestOptions);
      const data = await response.json();

      if (data.error) {
        return alert(data.error);
      }
      localStorage.setItem("user", JSON.stringify(data));
      console.log(data);
    }

    registerUser();
  };

  return (
    <React.Fragment>
      <form onSubmit={submitHandler}>
        <label htmlFor="">email</label>
        <input type="email" onChange={(e)=>setEmail(e.target.value)}/>
        <label htmlFor="">password</label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
        <button type="submit">Login</button>
      </form>
      <p>Not an user? <button onClick={()=>naviagte('/register')}>Register</button></p>
      </React.Fragment>
  );
}

export default Login