import { Link } from 'react-router-dom';
import styles from './Create.module.css'
import { useState } from 'react';
import * as itemService from '../../services/itemService.js';
import { useContext } from 'react';
import { ItemContext } from '../../contexts/ItemContext.js';

export const Create = () => {
    const { addItem } = useContext(ItemContext);
    const submitHandler = (e) => {
        e.preventDefault();
        itemService.create(itemData)
            .then(result => {
                addItem(result);
            })

        console.log(itemData);
        //setValues({
        //    category:'',
        //    img:'',
        //    title: '',
        //    description: '',
        //});
    };
    const [errors, setErrors] = useState({});
    const [itemData, setValues] = useState({
        category: '',
        img: '',
        title: '',
        description: '',
    });

    
    const changeHandler = (e) => {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };



    const minLength = (e, limit) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: itemData[e.target.name].length < limit,
        }));
    }


    return (
        <section className={styles.item}>
            <form onSubmit={submitHandler} >
                <div className={styles.container}>
                    <p><i className="fa-solid fa-folder-plus fa-2x"></i></p>
                    <h1>Create</h1>
                    <div className={styles.fields}>
                        <input type="text" id="category" name="category"
                            className={styles.field} placeholder="Category*"
                            value={itemData.category} onChange={changeHandler}
                            onBlur={(e) => minLength(e, 3)} />
                        {errors.category &&
                            <p className={styles.formError}>
                                Title should be at least 3 characters long!
                            </p>
                        }
                    </div>
                    <div className={styles.fields}>
                        <input type="text" id="img" name="img"
                            className={styles.field} placeholder="Image Url*"
                            value={itemData.img} onChange={changeHandler}
                            onBlur={(e) => minLength(e, 5)} />
                        {errors.img &&
                            <p className={styles.formError}>Image Url is not valid!</p>
                        }
                    </div>
                    <div className={styles.fields}>
                        <input type="text" id="title" name="title"
                            className={styles.field} placeholder="Title*"
                            value={itemData.title} onChange={changeHandler}
                            onBlur={(e) => minLength(e, 3)} />
                        {errors.title &&
                            <p className={styles.formError}>
                                Title should be at least 3 characters long!
                            </p>
                        }
                    </div>
                    <div className={styles.fields}>
                        <input type="text" id="description" name="description"
                            className={styles.field} placeholder="Description*"
                            value={itemData.description} onChange={changeHandler}
                            onBlur={(e) => minLength(e, 3)} />
                        {errors.description &&
                            <p className={styles.formError}>
                                Description should be at least 3 characters long!
                            </p>
                        }
                    </div>
                    <button className={styles.btn} >Create </button>    
                    <p className={styles.link}>
                        <span>
                            If you don't have profile go to <Link to="/register">SignUp</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    );
}

