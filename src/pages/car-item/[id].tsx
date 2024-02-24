import Head from "next/head"
import Link from "next/link"
import cls from "classnames"
import { useRouter } from "next/router"
import { fetchCarsList } from "@/lib/cars-list"
import { useEffect, useState } from "react"
import { baseUrl } from "@/lib/config"
import CarCard from "@/components/car-card"
import styles from "../../styles/car-item.module.css"
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
    const [carItem, setCarItem] = useState(props.carItem || {})

    const id = router.query.id

    const { model } = carItem

    useEffect(() => {
        const getCarItem = async () => {
            const responseRecord = await fetch(`${baseUrl}/${id}`)
            const record = await responseRecord.json()
            setCarItem(record)
        }

        getCarItem()
    }, [id])

    if (router.isFallback) {
        return <div>Loading...</div>
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
                        <div className="w-[450px] glass p-8 rounded">
                            <CarCard formData={carItem} />
                        </div>
                    </div>
                    <div className={cls("glass", styles.col1)}></div>
                </div>
            </div>
        </>
    )
}
