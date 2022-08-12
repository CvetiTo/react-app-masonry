import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ItemContext } from '../../contexts/ItemContext.js';
import DateObject from "react-date-object";
import Button from '@mui/material/Button';
import { getOne, remove } from '../../services/itemService.js';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { useUserContext } from '../../contexts/UserContext.js';


export const Details = () => {
    const { itemId } = useParams([]);
    const { itemRemove } = useContext(ItemContext);
    const { user } = useUserContext();
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState({});

    const isOwner = currentItem._ownerId === user._id;
    
    useEffect(() => {
        getOne(itemId)
            .then(result => {
                setCurrentItem(result);
            })
    }, [itemId]);
    //const item = items.find(x => x._id === itemId);

    const deleteItemHandler =  () => {
       const confirmation = window.confirm('Are you sure you want to delete this item?')
    
       if(confirmation) {
        remove(itemId)
        .then(() => {
            console.log(itemId)
            itemRemove(itemId);
            navigate('/catalog');
        })
       }
    }

    const linkStyles = {
        textDecoration:'none',
        color: 'inherit'
      }
    return (
        <Card sx={{ maxWidth: 1/3, ml: 80,mt: 10, textAlign: 'center' }}>
            <CardMedia
                component="img"
                height="420"
                image={currentItem.img}
                alt={currentItem.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Category: {currentItem.category}
                </Typography>
                <h5 color='#4A4F48'>Likes: {currentItem.likes}</h5>
                <h6>Created At: {new DateObject(currentItem._createdOn).format("DD.MM.YYYY")} </h6>
                <Typography gutterBottom variant="h5" component="div">
                    Title: {currentItem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Description: {currentItem.description}
                </Typography>
            </CardContent>
            {isOwner && 
            <CardActions sx={{ml:30}}>
                <Button size="small" variant="outlined" ><Link to={`/items/${itemId}/edit`} style={linkStyles} >Edit</Link></Button>
                <Button onClick={() => deleteItemHandler(currentItem._id)} size="small" variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
            </CardActions>
            }
            
        </Card>
    );
}