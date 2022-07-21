import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const naviagte = useNavigate();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const URL = "http://localhost:5000/api/users/register";

  const submitHandler = (e) => {
    e.preventDefault();
    const userData = {
      name: username,
      email: email,
      password: password,
      role: "user",
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
        <label htmlFor="">Username</label>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="">email</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="">password</label>
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      <p>
        Already an user?{" "}
        <button onClick={() => naviagte("/login")}>Login</button>
      </p>
    </React.Fragment>
  );
};

export default Register;
