import styles from './Home.module.css'
import * as itemService from '../../services/itemService.js';
import { useState, useEffect } from 'react';


export const Home = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        itemService.getLastFive()
            .then(result =>
                setItems(result)
            )
    }, []);

    return (
        <div className={styles.background}>
            <section id="welcome" className={styles.sidebar}>
                <h1 className={styles.title}>welcome</h1>
                <p className={styles.description}>to your friends ideas</p>
            </section>
            <div className={styles.container}>
                <h1>Get your next idea from...</h1>    
            </div>
            <div className={styles.cards} >
                {items.map((item, _id) => (
                    <div className={styles.card} key={item._id}>
                        <h3>{item.category}</h3>
                        <img srcSet={item.img} />
                    </div>
                ))}
            </div>
        </div>
    );
}