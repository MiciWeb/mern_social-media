import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const Log = () => {
  const [RegisterForm, setRegisterForm] = useState(false);
  const [LoginForm, setLoginForm] = useState(false);
  const [InviteForm, setInviteForm] = useState(false);

  const handleForm = (e) => {
    if (e.target.id === "register") {
      setLoginForm(false);
      setRegisterForm(true);
      setInviteForm(false);
    } else if (e.target.id === "login") {
      setRegisterForm(false);
      setLoginForm(true);
      setInviteForm(false);
    } else if (e.target.id === "invite") {
      setRegisterForm(false);
      setLoginForm(false);
      setInviteForm(true);
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
            className={(LoginForm || InviteForm) ? "active-btn" : null}
          >
            Se connecter
          </li>
          <li
            onClick={handleForm}
            id="invite"
            style={{color:"orangered"}}
          >
            Compte invité
          </li>
        </ul>
        {RegisterForm && <Register />}
        {LoginForm && <Login />}
        {InviteForm && <Login invite={true} />}
      </div>
    </div>
  );
};

export default Log;
