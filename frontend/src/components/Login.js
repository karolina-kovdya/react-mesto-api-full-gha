import React, { useEffect, useState } from "react";
import { UseInput } from "../hooks/UseInput";

function Login({ onSignIn }) {
  const email = UseInput("", { isEmpty: true , isEmail: ''});
  const password = UseInput("", { isEmpty: true, minLength: 3 });
  const [formValid, setFormValid] = useState(true);

  useEffect(() => {
    if (email.isEmpty || email.emailError || password.isEmpty || password.minLengthError) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [email.isEmpty, email.emailError, password.isEmpty, password.minLengthError]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    onSignIn({
      email: email.value,
      password: password.value,
    });
  }

  return (
    <div className="login sign">
      <p className="sign__title">Вход</p>
      <form onSubmit={handleSubmit} className="sign__form">
        <fieldset className="sign__form-set">
          <div className="sign__form-field">
            <input
              className="sign__form-input"
              id="login-email"
              type="email"
              name="email"
              placeholder="Email"
              value={email.value || ""}
              onChange={(e) => email.onChange(e)}
              onBlur={(e) => email.onBlur(e)}
            />
            {(email.isDirty && email.isEmpty) && (<span style={{ color: "red", fontSize: 12 }}>Поле не может быть пустым.</span>)}
            {(email.isDirty && email.emailError) && (<span style={{ color: "red", fontSize: 12 }}>{email.emailError}</span>)}
          </div>
          <div className="sign__form-field">
            <input
              className="sign__form-input"
              id="login-password"
              type="password"
              name="password"
              placeholder="Пароль"
              value={password.value || ""}
              onChange={(e) => password.onChange(e)}
              onBlur={(e) => password.onBlur(e)}
            />
            {(password.isDirty && password.isEmpty) && (<span style={{ color: "red", fontSize: 12 }}>Поле не может быть пустым.</span>)}
            {(password.isDirty && password.minLengthError) && (<span style={{ color: "red", fontSize: 12 }}>{password.minLengthError}</span>)}
          </div>
        </fieldset>
        <button type="submit" className="sign__form-btn" disabled={!formValid}>

          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
