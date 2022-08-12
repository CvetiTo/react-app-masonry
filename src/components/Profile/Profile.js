import { useState,useEffect } from 'react';
import { useUserContext } from '../../contexts/UserContext.js';
import { useParams } from 'react-router-dom';
import { getByOwner } from '../../services/itemService.js';

export const Profile = () => {
    const { user } = useUserContext();
    const [currentItem, setCurrentItem] = useState({});
    const { items } = useParams([]);
    useEffect(() => {
        getByOwner(items)
            .then(result => {
                setCurrentItem(result);
            })
    }, [items]);
    const isOwner = currentItem._ownerId === user._id;
    return(
       <div  >
        {user.isAuthenticatedisAuthenticated
        ? <h1>alabala</h1>
    : <h2>dyra byra</h2>}
        
                
            </div>

    );
}

/*{items.length > 0
                ?   items.filter((currentItem, _ownerId) => ( 
                    <div  key={_ownerId}>
                        <h3>{currentItem.category}</h3>
                        <img src={currentItem.img} alt={currentItem.title}/>
                         <div>{currentItem.title}</div>
                    </div>    
                ))
                : <p className="noItems">No ideas yet...</p>
                }*/