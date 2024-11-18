import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "./Firebase"; // Correct import

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        navigate("/");
      })
      .catch((error) => alert(error.message));
  };

  const register = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log(auth);
        if (auth) {
          navigate("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <a href="/" className="login__logo">
        <img src="images/banner-advertising-online.png" alt="Logo" />
      </a>

      <div className="login__container">
        <h1>Sign in</h1>

        <form onSubmit={handleSignIn}>
          <div className="form__group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form__group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login__signInButton">
            Sign In
          </button>
        </form>

        <p className="login__terms">
          By continuing, you agree to our Conditions of Use and Privacy Notice.
        </p>

        <div className="login__register">
          <span>New customer? </span>
          <button onClick={register} className="loginr_Button">
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
