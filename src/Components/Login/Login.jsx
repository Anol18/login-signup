import React from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="wrapper">
        <div className="logo">
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt=""
          />
        </div>
        <div className="text-center mt-4 name">Login</div>
        <form className="p-3 mt-3">
          <div className="form-field d-flex align-items-center">
            <span className="far fa-user"></span>
            <input type="text" name="userName" placeholder="Username" />
          </div>
          <div className="form-field d-flex align-items-center">
            <span className="fas fa-key"></span>
            <input type="password" name="password" placeholder="Password" />
          </div>
          <button className="btn mt-3">Login</button>
        </form>
        <div className="text-center fs-6">
          <a href="#">Forget password?</a> or{" "}
          <NavLink to="/signup">Sign up</NavLink>
        </div>
      </div>
    </>
  );
}

export default Login;
