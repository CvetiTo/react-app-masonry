import styles from './Footer.module.css';

export const Footer = () => {
    return(
        <footer className={styles.footer}>
        <p>Copyright &copy; <span>{new Date().getFullYear()}</span> Created by Cveti</p>
    </footer> 
    );
}