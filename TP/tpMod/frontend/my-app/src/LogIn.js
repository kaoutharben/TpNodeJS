import { Link } from "react-router-dom";
import React, { useState }  from "react";
import "./LogIn.css";


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const login=e =>{
      e.preventDefault();
    }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src={require('./site.png')}
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="signIn" type="submit" onClick={login} >
            Sign In
          </button>
        </form>
       
      </div>
    </div>
  );
}

export default Login;
