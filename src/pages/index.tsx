import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
import Banner from "../components/banner.component"
import Card from "@/components/card"
// import coffeeStoresData from "../../data/coffee-stores.json";

import type { InferGetStaticPropsType, GetStaticProps } from "next"
import useTrackLocation from "@/hooks/use-track-location"
import { dispatchCarsList, fetchCarsList } from "@/lib/cars-list"
import { useContext, useEffect, useState } from "react"
import {
    CarItem,
    SetCarsListActionKind,
    StoreContext,
} from "@/store/store-context"
import Modal from "@/components/modal.module"
import CarForm from "@/components/car-form.component"
import LoadingSpinner from "@/components/loading-spinner"

type CarsList = Array<CarItem>

type props = {
    carsList: CarsList
}

export const getStaticProps: GetStaticProps<{}> = async () => {
    const carsList = await fetchCarsList()
    return {
        props: {
            carsList,
        },
    }
}
export default function Home(props: props) {
    const { dispatch, state } = useContext(StoreContext)
    const [isModalOpen, setModalOpen] = useState(false)
    const [isLoadingState, setLoadingState] = useState(false)
    const { carsList } = state
    const { isFindingLocation } = useTrackLocation()

    useEffect(() => {
        if (dispatch) {
            try {
                setLoadingState(true)
                dispatchCarsList(dispatch)
            } catch (error) {
                console.error("Error fetching cars")
            } finally {
                setLoadingState(false)
            }
        }
    }, [dispatch])

    return (
        <div className="min-h-screen">
            <Head>
                <title>Car Consulting</title>
                <meta
                    name="description"
                    content="allows you to discover coffee stores"
                />
            </Head>
            <main className={styles.container}>
                {isLoadingState ? (
                    <LoadingSpinner isLoading={isLoadingState} />
                ) : (
                    <div className={styles.bannerSection}>
                        <Banner
                            buttonText={
                                isFindingLocation ? "Locating" : "Add new car"
                            }
                            handleOnClick={() => setModalOpen(true)}
                        />
                        <div className={styles.heroImage}>
                            <Image
                                src="/static/hero-image.png"
                                alt="hero-image"
                                width={700}
                                height={400}
                            />
                        </div>
                        {carsList?.length > 0 ? (
                            <div className={styles.sectionWrapper}>
                                <h2 className={styles.heading2}>Cars list</h2>
                                <div className={styles.cardLayout}>
                                    {carsList?.map((carItem: CarItem) => (
                                        <Card
                                            key={carItem.id}
                                            className={styles.card}
                                            imgUrl={
                                                carItem.imgUrl ||
                                                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                            }
                                            name={carItem.model}
                                            href={`/car-item/${String(
                                                carItem.id
                                            )}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}
                <Modal
                    showModal={isModalOpen}
                    closeModal={() => setModalOpen(false)}
                >
                    <CarForm
                        setLoading={setLoadingState}
                        setModal={setModalOpen}
                        onClose={() => setModalOpen(false)}
                    />
                </Modal>
            </main>
        </div>
    )
}
