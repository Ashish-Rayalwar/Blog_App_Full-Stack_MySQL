import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { AuthContext } from "../context/authContext";
import Logo from "../images/logo.png";
const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
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
      .post("/users/login", user)
      .then((res) => {
        console.log(res.data);
        window.alert(res.data.message);
        localStorage.setItem("auth-token", res.data.token);
        login(JSON.stringify(res.data.data));
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.message);
      });
  };

  return (
    <div className="auth">
      <div className="logo">
        <Link className="link" to="/">
          <img style={{ width: "100px" }} src={Logo} alt="" />
        </Link>
      </div>
      <form onSubmit={HandleSubmit}>
        <h1>LogIn</h1>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={HandleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={HandleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
        <span>
          Don't have account ? <Link to="/signup">Register</Link>{" "}
        </span>
      </form>
    </div>
  );
};

export default Login;
