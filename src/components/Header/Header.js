import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../contexts/userContext.js';
import styles from './Header.module.css'

export const Header = () => {
    const { user } = useContext(UserContext);
    //console.log(user)
    return ( 
        <>    
        <div className={styles.header}>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li className={styles.navItem}><Link to="/" className={styles.link}>Home</Link>
                        </li>
                        
                        <li className={styles.navItem}><Link to="/catalog" className={styles.link}>Catalog</Link>
                        </li>
                        {user.email
                            ?   <>
                             <li className={styles.navItem}><Link to="/create" className={styles.link}>Create</Link>
                              </li>
                              <li className={styles.navItem}><Link to="/logout" className={styles.link}>Logout</Link>
                              </li>
                              </>
                            :  <>
                                <li className={styles.navItem}><Link to="/login" className={styles.link}>Login</Link>
                                </li>
                                <li className={styles.navItem}><Link to="/register" className={styles.link}>SignUp</Link>
                                </li> 
                                </>
                        }                      
                    </ul>
                </nav>              
            </div>  
           {user.email && <span className={styles.profile}>Hello {user.firstName} {user.lastName}</span>}  
           </>      
    );
}