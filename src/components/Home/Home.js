import styles from './Home.module.css'
import * as itemService from '../../services/itemService.js';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReadMoreIcon from '@mui/icons-material/ReadMore';

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
                <h2>- Latest items -</h2>   
            </div>
            <div className={styles.cards} >
                {items.length > 0
                ?   items.map((item, _id) => ( 
                    <div className={styles.card} key={item._id}>
                        <h3>{item.category}</h3>
                        <img srcSet={item.img} alt={item.title}/>
                        <li><Link className={styles.btn} to={`/catalog/${item._id}`}>See More<ReadMoreIcon /></Link></li>  
                    </div>    
                ))
                : <p className={styles.noItems}>No ideas yet...</p>
                }
            </div>
        </div>
    );
}