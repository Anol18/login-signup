import React from "react";
import { useEffect, useState, useRef } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { MdCheck } from "react-icons/md";
import { FaTimesCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

import axios from "../api/axios";
import "./Signup.css";
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";
function Signup() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  let nagivate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(pwd);
    console.log(result);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const U = USER_REGEX.test(user);
    const P = PWD_REGEX.test(pwd);
    if (!U || !P) {
      errMsg("Invalid Entry");
      return;
    }
    setSuccess(true);
    // try {
    //   const response = await axios.post(
    //     REGISTER_URL,
    //     JSON.stringify({ user, pwd }),
    //     {
    //       headers: { "Content-Type": "application/json" },
    //       withCredentials: true,
    //     }
    //   );
    //   console.log(response.data);
    //   console.log(response.accessToken);
    //   console.log(JSON.stringify(response));
    //   setSuccess(true);
    // } catch (err) {
    //   if (!err?.response) {
    //     setErrMsg("No Server Response");
    //   } else if (err.response?.status === 409) {
    //     setErrMsg("Username Taken");
    //   } else {
    //     setErrMsg("Registration Failed");
    //   }
    //   errRef.current.focus();
    // }
    setTimeout(() => {
      nagivate("/");
    }, 2000);
  };

  return (
    <>
      {success ? (
        <section className="signup-container">
          <h1>Success</h1>

          <p>
            <NavLink to="/">Login</NavLink>
          </p>
        </section>
      ) : (
        <section className="signup-container">
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <span className={validName ? "valid" : "hide"}>
                <MdCheck />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-descridedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              placeholder="Enter Username"
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <BsFillInfoCircleFill /> 4 to 24 characters <br />
              Must be begin with letter <br />
              Letter, Number, underscores, hyphens allowed. <br />
            </p>

            <label htmlFor="password">
              Password:
              <span className={validPwd ? "valid" : "hide"}>
                <MdCheck />
              </span>
              <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="password"
              name=""
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              placeholder="Enter Password"
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <BsFillInfoCircleFill /> 8 to 24 characters. <br />
              Must include uppercase nad lowercase letters, a number and a
              special character. <br />
              Letter, Number, underscores, hyphens allowed. <br />
              Allowed special characters :{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <MdCheck />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FaTimesCircle />
              </span>
            </label>
            <input
              type="password"
              name=""
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describeby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              placeholder="Confirm Password"
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              {" "}
              <FaTimesCircle /> Must match the first password inout field
            </p>
            <button
              type="submit"
              disabled={!validName || !validPwd || !validMatch ? true : false}
            >
              Submit
            </button>
          </form>
          <p>
            Already registered? <br />
            <span className="line">
              <NavLink to="/" className="link">
                Login
              </NavLink>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Signup;
