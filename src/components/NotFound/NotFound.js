import RiseLoader from 'react-spinners/RotateLoader';
import styles from './NotFound.module.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <h2>404 Not Found</h2>
            <div className={styles.spinner}>
                <RiseLoader color='#314584' size='80' />
            </div>
            <p>This page is not valid... Go to <Link to="/" className={styles.link}>Home</Link></p>
        </div>
    );
};

export default NotFound;
