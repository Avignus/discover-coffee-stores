import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Banner from "../components/banner.component";
import Card from "@/components/card";
// import coffeeStoresData from "../../data/coffee-stores.json";

import type { InferGetStaticPropsType, GetStaticProps } from "next";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import useTrackLocation from "@/hooks/use-track-location";
import { useContext, useEffect, useState } from "react";
import {
    ACTION_TYPES,
    SetCoffeStoresActionKind,
    StoreContext,
} from "@/store/store-context";
type CoffeeItem = {
    id: number;
    name: string;
    imgUrl: string;
    websiteUrl: string;
    address: string;
    neighbourhood: string;
};

type CoffeeList = Array<CoffeeItem>;

type props = {
    coffeeStores: CoffeeList;
};

export const getStaticProps: GetStaticProps<{}> = async () => {
    const coffeeStores = await fetchCoffeeStores();
    return {
        props: {
            coffeeStores,
        },
    };
};
export default function Home(props: props) {
    const { dispatch, state } = useContext(StoreContext);
    // const [coffeeStores, setCoffeeStores] = useState([]);
    const [coffeeStoresError, setCoffeeStoresError] = useState("");
    const { latLong, coffeeStores } = state;
    const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
        useTrackLocation();

    const handleOnBannerBtnClick = () => {
        handleTrackLocation();
    };
    useEffect(() => {
        async function fetchData() {
            if (latLong) {
                try {
                    const response = await fetch(
                        `/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=30`
                    );
                    const coffeeStores = await response.json();
                    if (dispatch) {
                        dispatch({
                            type: ACTION_TYPES.SET_COFFEE_STORES as SetCoffeStoresActionKind.SET_COFFEE_STORES,
                            payload: { coffeeStores },
                        });
                    }
                    setCoffeeStoresError("");
                } catch (err: any) {
                    const errorMessage = err.message;
                    setCoffeeStoresError(errorMessage);
                    console.log(err);
                }
            }
        }
        fetchData();
    }, [latLong]);

    return (
        <div>
            <Head>
                <title>Coffee Connoisseur</title>
                <meta
                    name="description"
                    content="allows you to discover coffee stores"
                />
            </Head>
            <main className={styles.container}>
                <div className={styles.bannerSection}>
                    <Banner
                        buttonText={
                            isFindingLocation
                                ? "Locating"
                                : "View stores nearby"
                        }
                        handleOnClick={handleOnBannerBtnClick}
                    />
                    {locationErrorMsg && (
                        <p>Something went wrong {locationErrorMsg}</p>
                    )}{" "}
                    {coffeeStoresError && (
                        <p>Something went wrong {coffeeStoresError}</p>
                    )}{" "}
                    <div className={styles.heroImage}>
                        <Image
                            src="/static/hero-image.png"
                            alt="hero-image"
                            width={700}
                            height={400}
                        />
                    </div>
                    {coffeeStores && coffeeStores.length > 0 && (
                        <div className={styles.sectionWrapper}>
                            <h2 className={styles.heading2}>Stores near me</h2>
                            <div className={styles.cardLayout}>
                                {coffeeStores.map((coffeeStore: any) => (
                                    <Card
                                        key={coffeeStore.id}
                                        className={styles.card}
                                        imgUrl={
                                            coffeeStore.imgUrl ||
                                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        }
                                        name={coffeeStore.name}
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {props.coffeeStores.length > 0 && (
                        <div className={styles.sectionWrapper}>
                            <h2 className={styles.heading2}>Toronto Stores</h2>
                            <div className={styles.cardLayout}>
                                {props.coffeeStores.map((coffeeStore: any) => (
                                    <Card
                                        key={coffeeStore.id}
                                        className={styles.card}
                                        imgUrl={
                                            coffeeStore.imgUrl ||
                                            "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                                        }
                                        name={coffeeStore.name}
                                        href={`/coffee-store/${coffeeStore.id}`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
