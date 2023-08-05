import React, { useState } from 'react';
import styles from './auth.module.css';
import { register } from '../../services/apiClient';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
    const changeForm = props.changeForm;
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
        confirmPassword: '',
    })

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (form.username == '' || form.password == '' || form.confirmPassword == '') {
          Swal.fire({
            title: 'Stop there!',
            text: "You need to fill all required input!",
            icon: 'warning',
          })
        } else if(form.password == form.confirmPassword){     
          const registerRequest = async () => {
            let response;
            try {
              response = await register(form.username, form.password, form.confirmPassword);
              if (response.status === 200) {
                setForm(response.data.user);
                localStorage.setItem('blog-token', response.data.token)
                Swal.fire(
                  'Success!',
                  'You has been registered successfully',
                  'success'
                ).then((result) => {
                  navigate(`/`, { username: form.username });
                });
              } else {
                Swal.fire(
                  'Wait!',
                  `${response.data.message}`,
                  'info'
                ).then((result) => {
                  navigate(`/`);
                });
              }
            } catch (error) {
              Swal.fire(
                'Oops...!',
                `${error.message}`,
                'info'
              ).then((result) => {
                console.log();
                // navigate('/');
              });
            }
          };
          console.log(form);
          registerRequest();
        }else {
          Swal.fire(
            'Wait!',
            'please make sure your password and confirm password are equal',
            'info'
          )
        }
      }
    return (
        <div className={`${styles.form} ${styles.signup}`}>
            <div className={`${styles.form_content}`}>
                <header>Signup</header>
                <form action="#">
                    <div className={`${styles.field} ${styles.input_field}`}>
                        <input
                            type="text"
                            value={form.username}
                            placeholder="User username"
                            className="input"
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
                    <div className={`${styles.field} ${styles.input_field}`}>
                        <input
                            type="password"
                            value={form.confirmPassword}
                            placeholder="Confirm Password"
                            className={`${styles.password} `}
                            required={true}
                            onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                        />
                        <i className={`${styles.eye_icon}`}></i>
                    </div>
                    <div className={`${styles.field} ${styles.button_field}`}>
                        <button onClick={handleSubmitForm}>Signup</button>
                    </div>
                </form>
                <div className={`${styles.form_link}`}>
                    <span>Already have an account? <button onClick={changeForm} className={`${styles.link} ${styles.login_link}`}>Login</button></span>
                </div>
            </div>
        </div>
    )
}

export default Signup