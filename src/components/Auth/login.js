import React, { useEffect, useState } from 'react'
import styles from './auth.module.css';
import Swal from 'sweetalert2';
import { login } from '../../services/apiClient';
import { useNavigate } from 'react-router-dom';
import { useLocalStorageUser } from '../common/functions/functions';

function Login(props) {
  const user = useLocalStorageUser();
    const changeForm = props.changeForm;
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    useEffect(() =>{
        if(user){
            window.location.href = '/';
        }
      }, []);

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (form.username == '' || form.password == '') {
            Swal.fire({
                title: 'Stop there!',
                text: "You need to fill all required input!",
                icon: 'warning',
            })
        } else if (form.password.length >= 6) {
            const registerRequest = async () => {
                let response;
                try {
                    response = await login(form.username, form.password, form.confirmPassword);
                    if (response.status === 200) {
                        setForm(response.data.user);
                        localStorage.setItem('blog-token', response.data.token)
                        Swal.fire(
                            'Success!',
                            'You have been logged in successfully',
                            'success'
                        ).then((result) => {
                            window.location.href = '/';
                        });
                    } else {
                        Swal.fire(
                            'Wait!',
                            `${response.data.error}`,
                            'info'
                        )
                    }
                } catch (error) {
                    Swal.fire(
                        'Oops...!',
                        `${error.message}`,
                        'info'
                    )
                }
            };
            registerRequest();
        } else {
            Swal.fire({
                title: 'Stop there!',
                text: "Your password should be more than 6 characters!",
                icon: 'warning',
            })
        }
    }

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