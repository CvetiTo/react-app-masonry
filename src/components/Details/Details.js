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


export const Details = () => {
    const { itemId } = useParams([]);
    const { itemRemove } = useContext(ItemContext);
    const navigate = useNavigate();
    const [currentItem, setCurrentItem] = useState({});
    
    useEffect(() => {
        getOne(itemId)
            .then(result => {
                setCurrentItem(result);
            })
    }, []);
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
        <Card sx={{ maxWidth: 1/2, ml: 50,mt: 10, textAlign: 'center' }}>
            <CardMedia
                component="img"
                height="140"
                image={currentItem.img}
                alt={currentItem.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {currentItem.category}
                </Typography>
                <h5 color='#4A4F48'>Likes: {currentItem.likes}</h5>
                <h6>{new DateObject(currentItem._createdOn).format("DD.MM.YYYY")} </h6>
                <Typography gutterBottom variant="h5" component="div">
                    {currentItem.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {currentItem.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ml:50}}>
                <Button size="small" variant="outlined" ><Link to={`/items/${itemId}/edit`} style={linkStyles} >Edit</Link></Button>
                <Button onClick={() => deleteItemHandler(currentItem._id)} size="small" variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
            </CardActions>
        </Card>
    );
}