import { Link } from 'react-router-dom';
import styles from './LogIn.module.css'
import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/userContext.js';
import { register } from '../../services/userService.js';

const Register = () => {
    const { userLoginHandler } = useContext(UserContext);
    
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rePass: '',
        age: '',
        tac: false,
    });
    
    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
        }));
    };
    
    const submitHandler = (e) => {
        e.preventDefault();

        // let values = Object.fromEntries(new FormData(e.target))
        // console.log(values);
        
       //if(values.password !== values.rePass) {
       //    return;
       //}
        
        register(values.firstName, values.lastName, values.email, values.password, values.age, values.tac)
            .then(userData => {
                userLoginHandler(userData);
                //navigate('/');
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
    const minAge = (e, minlimit) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: values[e.target.name] < minlimit,
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
            <form onSubmit={submitHandler}>
                <div className={styles.container}>
                    <p><i className="fa-solid fa-lock fa-2x"></i></p>
                    <h1>Sign up</h1>
                    <div className={styles.inputFields}>
                        <div className={styles.fieldName}>
                            <div className={styles.fieldsNames}>
                                <div className={styles.names}>
                                    <label htmlFor="firstName"></label>
                                    <input type="text" id="firstName" name="firstName"
                                        className={styles.firstName} placeholder="First Name*"
                                        value={values.firstName} onChange={changeHandler}
                                        onBlur={(e) => minLength(e, 3)} />
                                </div>
                                <div>
                                    {errors.firstName &&
                                        <p className={styles.formError}>
                                            First name should be at least 3 characters long!
                                        </p>
                                    }
                                </div>
                            </div>
                            <div className={styles.fieldsNames}>
                                <div className={styles.names}>
                                    <label htmlFor="lastName"></label>
                                    <input type="text" id="lastName" name="lastName"
                                        className={styles.lastName} placeholder="Last Name*"
                                        value={values.lastName} onChange={changeHandler}
                                        onBlur={(e) => minLength(e, 3)} />
                                </div>
                                <div>
                                    {errors.lastName &&
                                        <p className={styles.formError}>
                                            Last name should be at least 3 characters long!
                                        </p>
                                    }
                                </div>
                            </div>
                        </div>
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
                        <div className={styles.fields}>
                            <label htmlFor="rePass"></label>
                            <input type="password" id="rePass" name="rePass"
                                className={styles.email} placeholder="Repeat Password*"
                                value={values.rePass} onChange={changeHandler}
                                onBlur={(e) => minLength(e, 5)} />
                            {errors.rePass &&
                                <p className={styles.formError}>
                                    Password should be at least 5 characters long!
                                </p>
                            }
                        </div>
                        <div className={styles.fieldsAge}>
                            <label htmlFor="age"></label>
                            <input id="age" type="number" name="age" className={styles.age}
                                value={values.age} onChange={changeHandler} placeholder="Age*"
                                onBlur={(e) => minAge(e, 10)} />
                            {errors.age &&
                                <p className={styles.formError}>
                                    You must be min 10 years old!
                                </p>
                            }
                        </div>
                        <div className={styles.fields}>
                            <input className={styles.tac} type="checkbox" name="tac" id="tac" checked={values.tac} onChange={changeHandler} />
                            <label className={styles.tac} htmlFor="tac"> I want to receive inspiration, marketing promotions and updates via email.</label>
                        </div>
                        <input type="submit" className={styles.btn} value="Sign Up"/>
                        <button className={styles.btnClose} >Cansel</button>
                        <p className={styles.field}>
                            <span>
                                Already have an account? <Link to="/login">Log in</Link>
                            </span>
                        </p>
                    </div>
                </div>
            </form>
        </section>
    );
}
export default Register;