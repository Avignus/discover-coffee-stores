import styles from "../styles/banner.module.css"

type propsTypes = {
    buttonText: string
    handleOnClick: () => void
}
const Banner = (props: propsTypes) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.title1}>Car</span>
                <span className={styles.title2}>Consulting</span>
            </h1>
            <p className={styles.subTitle}>Discover your ideal car!</p>
            <div className={styles.buttonWrapper}>
                <button onClick={props.handleOnClick} className={styles.button}>
                    {props.buttonText}
                </button>
            </div>
        </div>
    )
}

export default Banner
