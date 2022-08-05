import { useState } from "react";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CountertopsIcon from '@mui/icons-material/Countertops';
import styles from './Counter.module.css';

export const Counter = (props) => {
    const [count, setCount] = useState(props.start || 0);

    const increaseHandler = () => {
        setCount(oldCount => oldCount + 1);
    }
    const decreaseHandler = () => {
        setCount(oldCount => oldCount - 1);
    }

    return (
        <div className={styles.counter} >
            
            <button onClick={decreaseHandler} className={styles.down}><ThumbDownIcon/></button>
            <button className={styles.count}><CountertopsIcon/> {count}</button>
            <button onClick={increaseHandler} className={styles.up}><ThumbUpIcon/></button>
        </div>
    )
}