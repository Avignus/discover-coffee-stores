import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import cls from "classnames"
import styles from "../../styles/car-item.module.css"
import { useRouter } from "next/router"
import { fetchCarsList } from "@/lib/cars-list"
import { useEffect, useState } from "react"
import { baseUrl } from "@/lib/config"
type Params = {
    params: {
        id: string
    }
}
export type CarItem = {
    id: string
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
export async function getStaticProps(staticProps: Params) {
    const carsList = await fetchCarsList()
    const params = staticProps.params
    const findCarById = carsList?.find(
        (caritem: any) => caritem.id === params.id
    )

    return {
        props: {
            caritem: findCarById ? findCarById : {},
        },
    }
}

export async function getStaticPaths() {
    const carsList = await fetchCarsList()
    const paths = carsList?.map((carItem: CarItem) => {
        return {
            params: {
                id: String(carItem.id),
            },
        }
    })
    return {
        paths,
        fallback: true,
    }
}
export default function CarItem(props: any) {
    const router = useRouter()
    const [votingCount, setVotingCount] = useState(0)
    const [carItem, setCarItem] = useState(props.carItem || {})

    const id = router.query.id

    const {
        maker,
        model,
        package: carPackage,
        color,
        year,
        category,
        mileage,
        price,
        imgUrl,
    } = carItem

    useEffect(() => {
        const getCarItem = async () => {
            const responseRecord = await fetch(`${baseUrl}/${id}`)
            const record = await responseRecord.json()
            setCarItem(record)
        }

        getCarItem()
    }, [])

    if (router.isFallback) {
        return <div>Loading...</div>
    }
    function centsToUSD(cents: number) {
        const usd = cents / 100
        return usd.toFixed(2) // Format to two decimal places
    }
    return (
        <>
            <div className="h-min-screen">
                <Head>
                    <title>{model}</title>
                    <meta name="description" content={`${model}`} />
                </Head>
                <div className={styles.container}>
                    <div className={styles.col2}>
                        <div className={styles.backToHomeLink}>
                            <Link href="/">← Back to home</Link>
                        </div>
                        <div className="glass p-8 rounded">
                            <div className={styles.nameWrapper}>
                                <h1 className={styles.name}>Maker:</h1>
                                <span className={cls("pl-4", styles.name)}>
                                    {maker}
                                </span>
                            </div>
                            <div className={styles.nameWrapper}>
                                <h1 className={styles.name}>Model:</h1>
                                <span className={cls("pl-4", styles.name)}>
                                    {model}
                                </span>
                            </div>
                            <div className={styles.nameWrapper}>
                                <h1 className={styles.name}>Package:</h1>
                                <span className={cls("pl-4", styles.name)}>
                                    {carPackage}
                                </span>
                            </div>
                            <div className={styles.nameWrapper}>
                                <h1 className={styles.name}>Color:</h1>
                                <span className={cls("pl-4", styles.name)}>
                                    {color}
                                </span>
                            </div>
                            <div className={styles.nameWrapper}>
                                <h1 className={styles.name}>Year:</h1>
                                <span className={cls("pl-4", styles.name)}>
                                    {year}
                                </span>
                            </div>
                            <div className={styles.nameWrapper}>
                                <h1 className={styles.name}>Category:</h1>
                                <span className={cls("pl-4", styles.name)}>
                                    {category}
                                </span>
                            </div>
                            <div className={styles.nameWrapper}>
                                <h1 className={styles.name}>Mileage:</h1>
                                <span className={cls("pl-4", styles.name)}>
                                    {mileage}
                                </span>
                            </div>
                            <div className={styles.nameWrapper}>
                                <h1 className={styles.name}>Price:</h1>
                                <span className={cls("pl-4", styles.name)}>
                                    {centsToUSD(price)}
                                </span>
                            </div>
                            <h1 className={styles.name}>Photo:</h1>
                            <Image
                                alt="banner-image"
                                src={
                                    imgUrl ||
                                    "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                }
                                width={600}
                                height={360}
                                className={cls("pl-4", styles.storeImg)}
                            />
                        </div>
                    </div>
                    <div className={cls("glass", styles.col1)}></div>
                </div>
            </div>
        </>
    )
}
