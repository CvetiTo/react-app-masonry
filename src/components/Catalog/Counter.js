import { useState} from "react";
import { useParams } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CountertopsIcon from '@mui/icons-material/Countertops';
import styles from './Counter.module.css';
//import { useContext } from 'react';
//import { ItemContext } from '../../contexts/ItemContext.js';
//import * as itemService from '../../services/itemService.js';
export const Counter = (props) => {
    const [likes, setLikes] = useState(props.start || 0);
    const { itemId } = useParams();
    //const { itemLikes } = useContext(ItemContext);

   //useEffect(() => {
   //    itemService.getOne(itemId)
   //        .then(likes => {
   //            setLikes(likes);
   //        })
   //}, []);

    //const submitHandler = (e) => {
    //    e.preventDefault();
//
    //    const likesData = Object.fromEntries(new FormData(e.target));
//
    //    itemService.editLikes(itemId, likesData)
    //        .then(result => {
    //            itemLikes(itemId, result);
    //            //navigate(`/catalog/${itemId}`)
    //        });
//
    //    console.log(likesData);
    //};
    

    const increaseHandler = () => {
        setLikes(oldlikes => Number(oldlikes) + 1);
    }
    const decreaseHandler = () => {
        setLikes(oldlikes => Number(oldlikes) - 1);
    }

    return (
        <div key={itemId} className={styles.counter} >
            <button onClick={decreaseHandler} className={styles.down}><ThumbDownIcon/></button>
            <button className={styles.count}><CountertopsIcon/> {likes}</button>
            <button onClick={increaseHandler} className={styles.up}><ThumbUpIcon/></button>
        </div>
    )
}