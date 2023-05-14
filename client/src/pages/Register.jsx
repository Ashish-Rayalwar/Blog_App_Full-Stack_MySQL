import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../api/api";

function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const HandleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    api
      .post("/users/signup", user)
      .then((res) => {
        console.log(res.data);
        // window.alert(res.data);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };
  return (
    <div className="auth">
      <form onSubmit={HandleSubmit}>
        <h1>SignUp</h1>
        <input
          required
          type="text"
          autoComplete="off"
          placeholder="username"
          name="username"
          onChange={HandleChange}
        />
        <input
          required
          type="email"
          autoComplete="off"
          placeholder="email"
          name="email"
          onChange={HandleChange}
        />
        <input
          required
          type="password"
          autoComplete="off"
          placeholder="password"
          name="password"
          onChange={HandleChange}
        />
        <button type="submit">SignUp</button>
        {error && <p>{error}</p>}

        <span>
          Already have account ? <Link to="/login">LogIn</Link>{" "}
        </span>
      </form>
    </div>
  );
}

export default Register;
