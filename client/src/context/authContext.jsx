import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  const login = async (inputs) => {
    // const res = await axios.post("/users/login", inputs);
    localStorage.setItem("user", inputs);
    setCurrentUser(inputs);
  };

  const logout = () => {
    localStorage.clear();
    setCurrentUser(null);
    navigate("/");
  };
  const CheckLogin = (children) => {
    useEffect(() => {
      let user = localStorage.getItem("user");
      // let token = Cookies.get("newToken");
      // console.log(token);
      if (!user) {
        return navigate("/");
      }
    }, []);

    return children.children;
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: Boolean(currentUser),
        currentUser,
        login,
        logout,
        CheckLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
