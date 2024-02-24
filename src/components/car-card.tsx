import React from "react"
import styles from "../styles/car-card.module.css" // Import the CSS module with the styles
import Image from "next/image"

interface CarData {
    imgUrl: string
    maker: string
    model: string
    package: string
    color: string
    year: string
    category: string
    mileage: number
    price: number
}

interface CarCardProps {
    formData: CarData
}

const CarCard: React.FC<CarCardProps> = ({ formData }) => {
    console.log({ formData })
    const {
        imgUrl,
        maker,
        model,
        package: carPackage,
        color,
        year,
        category,
        mileage,
        price,
    } = formData

    function centsToUSD(cents: number) {
        const usd = cents / 100
        return usd.toFixed(2) // Format to two decimal places
    }

    return (
        <div className={styles.cardContainer}>
            <Image
                width={200}
                height={200}
                src={imgUrl}
                alt="Car Image"
                className={styles.carImage}
            />
            <div className={styles.containerData}>
                <div className={styles.carProperty}>Maker:</div>
                <div className={styles.carValue}>{maker}</div>
            </div>
            <div className={styles.containerData}>
                <div className={styles.carProperty}>Model:</div>
                <div className={styles.carValue}>{model}</div>
            </div>
            <div className={styles.containerData}>
                <div className={styles.carProperty}>Package:</div>
                <div className={styles.carValue}>{carPackage}</div>
            </div>
            <div className={styles.containerData}>
                <div className={styles.carProperty}>Color:</div>
                <div className={styles.carValue}>{color}</div>
            </div>
            <div className={styles.containerData}>
                <div className={styles.carProperty}>Year:</div>
                <div className={styles.carValue}>{year}</div>
            </div>
            <div className={styles.containerData}>
                <div className={styles.carProperty}>Category:</div>
                <div className={styles.carValue}>{category}</div>
            </div>
            <div className={styles.containerData}>
                <div className={styles.carProperty}>Mileage:</div>
                <div className={styles.carValue}>{mileage}</div>
            </div>
            <div className={styles.containerData}>
                <div className={styles.carProperty}>Price:</div>
                <div className={styles.carValue}>{centsToUSD(price)}</div>
            </div>
        </div>
    )
}

export default CarCard
