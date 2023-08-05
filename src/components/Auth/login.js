import React, { useEffect, useState } from 'react'
import styles from './auth.module.css';

function Login(props) {
    const changeForm = props.changeForm;
    const [form, setForm] = useState({
        username: '',
        password: '',
    })

    const handleSubmitForm = () => {}

    useEffect(()=> {console.log(form)}, [form]);
    return (
        <div className={`${styles.form} ${styles.login}`}>
            <div className={`${styles.form_content}`}>
                <header>Login</header>
                <form action="#">
                    <div className={`${styles.field} ${styles.input_field}`}>
                        <input
                            type="text"
                            value={form.username}
                            placeholder="User Name"
                            required={true}
                            onChange={(e) => setForm((f) => ({ ...f, username: e.target.value }))}
                        />
                    </div>
                    <div className={`${styles.field} ${styles.input_field}`}>
                        <input
                            type="password"
                            value={form.password}
                            placeholder="Password"
                            className={`${styles.password} `}
                            required={true}
                            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
                        />
                    </div>
                    <div className={`${styles.field} ${styles.button_field}`}>
                        <button onClick={handleSubmitForm} >Login</button>
                    </div>
                </form>
                <div className={`${styles.form_link}`}>
                    <span>Don't have an account? <button onClick={changeForm} className={`${styles.link} ${styles.login_link}`}>Signup</button></span>
                </div>
            </div>
        </div>
    );
}

export default Login