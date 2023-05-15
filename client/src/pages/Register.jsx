import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../api/api";

function Register() {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const HandleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    formData.append("img", image);
    api
      .post("/users/signup", formData)
      .then((res) => {
        console.log(res.data);
        console.log(image);
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
        <input
          style={{ display: "none" }}
          type="file"
          id="file"
          name="img"
          onChange={handleImageChange}
          // onChange={(e) => setFile(e.target.files[0])}
        />
        <label className="file" htmlFor="file">
          Select Profile Image
        </label>
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
