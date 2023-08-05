import React, { useEffect, useState } from 'react'
import styles from './auth.module.css';
import Login from './login.js';
import Signup from './signup.js';

function Auth(props) {
  const user = props.user;
  const AUTH = {
    LOGIN: "login",
    SIGNUP: "signup",
  }

  const [form, setForm] = useState(AUTH.LOGIN);

  const changeForm = () => {
    form === AUTH.LOGIN ? setForm(AUTH.SIGNUP) : setForm(AUTH.LOGIN);
  }

  

  return (
    <div className={styles.container}>
      {form === AUTH.LOGIN ? (
          <Login changeForm={changeForm} />
      ) : (
        <Signup changeForm={changeForm} />
      )}
    </div>
  )
}

export default Auth