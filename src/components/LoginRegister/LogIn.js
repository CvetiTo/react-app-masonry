import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext.js';
import styles from './LogIn.module.css'
import { login } from '../../services/userService.js';


const LogIn = () => {
    const { userLoginHandler } = useContext(UserContext);
    
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };
    
    const submitHandler = (e) => {
        e.preventDefault();

        login(values.email, values.password)
        .then(userData => {
            userLoginHandler(userData);
            navigate('/');
        })
        .catch((error) => {
            console.log(error.massage);
        })
    };

    
    const minLength = (e, limit) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name].length < limit,
        }));
    }

    const isValidEmail = (e) => {
        let regex = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]/.test(e.target.value);
        setErrors(state => ({
            ...state,
            [e.target.name]: regex ? false : true,
        }));
    }

    return (
        <section className={styles.auth}>
            <form onSubmit={submitHandler} className={styles.login}>
                <div className={styles.container}>
                    <p><i className="fa-solid fa-unlock-keyhole fa-2x"></i></p>
                    <h1>Log in</h1>
                    <div className={styles.fields}>
                        <label htmlFor="email"></label>
                        <input type="email" id="email" name="email"
                            className={styles.email} placeholder="Email address*"
                            value={values.email} onChange={changeHandler}
                                onBlur={isValidEmail} />
                        {errors.email &&
                            <p className={styles.formError}>Email is not valid!</p>
                        }        
                    </div>
                    <div className={styles.fields}>
                        <label htmlFor="password"></label>
                        <input type="password" id="password" name="password"
                            className={styles.email} placeholder="Password*"
                            value={values.password} onChange={changeHandler}
                                onBlur={(e) => minLength(e, 5)} />
                        {errors.password &&
                                <p className={styles.formError}>
                                    Password should be at least 5 characters long!
                                </p>
                            }
                    </div>

                    <button className={styles.btn} type="submit" >Log in</button>
                    <button type="button" 
                    className={styles.btnClose} >Cansel</button>
                    <p className={styles.field}>
                        <span>
                            If you don't have profile go to <Link to="/register">SignUp</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}
export default LogIn;