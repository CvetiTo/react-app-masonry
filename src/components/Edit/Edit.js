import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from '../Create/Create.module.css'
import { useState, useEffect } from 'react';
import * as itemService from '../../services/itemService.js';
import { useContext } from 'react';
import { ItemContext } from '../../contexts/ItemContext.js';

export const Edit = () => {
    const [currentItem, setCurrentItem] = useState({});
    const [errors, setErrors] = useState({});
    const { itemEdit } = useContext(ItemContext);
    const { itemId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        itemService.getOne(itemId)
            .then(itemData => {
                setCurrentItem(itemData);
            })
    }, [itemId]);

    const submitHandler = (e) => {
        e.preventDefault();

        const itemData = Object.fromEntries(new FormData(e.target));

        itemService.edit(itemId, itemData)
            .then(result => {
                itemEdit(itemId, result);
                navigate(`/catalog/${itemId}`)
            });

        console.log(itemData);
    };
    const changeHandler = (e) => {
        setCurrentItem(state => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const minLength = (e, limit) => {
        setErrors(state => ({
            ...state,
            [e.target.name]: currentItem[e.target.name].length < limit,
        }));
    }
    
    return(
        <section className={styles.item}>
            <form onSubmit={submitHandler} >
                <div className={styles.container}>
                    <p><i className="fa-solid fa-folder-plus fa-2x"></i></p>
                    <h1>Edit</h1>
                    <div className={styles.fields}>
                        <input type="text" id="category" name="category"
                            className={styles.field} placeholder="Category*"
                            value={currentItem.category} onChange={changeHandler}
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
                            value={currentItem.img} onChange={changeHandler}
                            onBlur={(e) => minLength(e, 5)} />
                        {errors.img &&
                            <p className={styles.formError}>Image Url is not valid!</p>
                        }
                    </div>
                    <div className={styles.fields}>
                        <input type="text" id="title" name="title"
                            className={styles.field} placeholder="Title*"
                            value={currentItem.title} onChange={changeHandler}
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
                            value={currentItem.description} onChange={changeHandler}
                            onBlur={(e) => minLength(e, 3)} />
                        {errors.description &&
                            <p className={styles.formError}>
                                Description should be at least 3 characters long!
                            </p>
                        }
                    </div>
                    <button className={styles.btn} >Edit</button>    
                    <p className={styles.link}>
                        <span>
                            If you don't have profile go to <Link to="/register">SignUp</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    )
}