import styles from './Home.module.css'

export const Home = () => {
    return (
            <div style={{
                backgroundImage: `url("https://cdn.pixabay.com/photo/2014/04/03/14/26/flora-312815_960_720.png")`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                width: '100vw',
                height: '100vh',
                marginLeft: '800px'

            }}>
                <div className={styles.sidebar}>

                    <section id="welcome" className="content-box">
                        <h1 className={styles.title}>welcome</h1>
                        <p className={styles.description}>to your and friends ideas</p>
                    </section>
                </div>
                <div className={styles.container}>
                    <div className="body">
                        <h1>Get your next idea from...</h1>
                    </div>
                </div>
            </div>
    );
}