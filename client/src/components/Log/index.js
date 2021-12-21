import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Log = ( props ) => {
  const [RegisterForm, setRegisterForm] = useState(props.register);
  const [LoginForm, setLoginForm] = useState(props.login);

  const handleForm = (e) => {
      console.log(e.target.id)
    if (e.target.id === "register") {
      setLoginForm(false);
      setRegisterForm(true);
    } else if (e.target.id === "login") {
      setRegisterForm(false);
      setLoginForm(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleForm}
            id="register"
            className={RegisterForm ? "active-btn" : null}
          >
            S'inscrire
          </li>
          <li
            onClick={handleForm}
            id="login"
            className={LoginForm ? "active-btn" : null}
          >
            Se connecter
          </li>
        </ul>
        {RegisterForm && <Register />}
        {LoginForm && <Login />}
      </div>
    </div>
  );
};

export default Log;
