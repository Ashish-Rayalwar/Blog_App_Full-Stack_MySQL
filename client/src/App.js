import { Router, Route, Routes, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import "./style.scss";
import Edit from "./pages/Edit";
import { AuthContext } from "./context/authContext";
import { useContext } from "react";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

function App() {
  let { CheckLogin } = useContext(AuthContext);
  return (
    <div className="App">
      <div className="container">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id" element={<Single />} />
            <Route path="/write" element={<Write />} />
            <Route
              path="/edit/:id"
              element={
                <CheckLogin>
                  <Edit />
                </CheckLogin>
              }
            />
          </Route>
          <Route path="/signup" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
