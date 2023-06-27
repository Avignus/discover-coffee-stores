import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import coffeeStoresData from "../../../data/coffee-stores.json";
import cls from "classnames";
import styles from "../../styles/coffee-store.module.css";
import { CoffeeStoreType } from "@/types";
import { useRouter } from "next/router";
import { fetchCoffeeStores } from "@/lib/coffee-stores";
import { fetcher, isEmpty } from "../../utils/index";
import { StoreContext } from "@/store/store-context";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";

type Params = {
    params: {
        id: string;
    };
};
type Props = {
    coffeeStore: CoffeeStoreType;
};

export async function getStaticProps(staticProps: Params) {
    const coffeeStores = await fetchCoffeeStores();
    const params = staticProps.params;
    const findCoffeeStoreById = coffeeStores.find(
        (coffeeStore: any) => coffeeStore.id === params.id
    );

    return {
        props: {
            coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
        },
    };
}

export async function getStaticPaths() {
    const coffeeStores = await fetchCoffeeStores();
    const paths = coffeeStores.map((coffeeStore: any) => {
        return {
            params: {
                id: coffeeStore.id,
            },
        };
    });
    return {
        paths,
        fallback: true,
    };
}
export default function CoffeeStore(props: any) {
    const router = useRouter();
    const [votingCount, setVotingCount] = useState(0);
    const [coffeeStore, setCoffeeStore] = useState(props.coffeeStore || {});

    const {
        state: { coffeeStores },
    } = useContext(StoreContext);
    const handleCreateCoffeeStore = async (coffeeStore: CoffeeStoreType) => {
        try {
            const { id, name, imgUrl, neighbourhood, address } = coffeeStore;

            const response = await fetch("/api/createCoffeeStore", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                    name,
                    voting: 0,
                    imgUrl,
                    neighbourhood,
                    address,
                }),
            });
            const dbCoffeeStore = await response.json();
        } catch (err) {
            console.error("Error creating coffee store", err);
        }
    };
    const id = router.query.id;

    useEffect(() => {
        const handleValidateCreateStore = async (
            coffeeStore: CoffeeStoreType
        ) => {
            let id = null;
            if (coffeeStore && coffeeStore.id !== undefined) {
                id = coffeeStore.id;
            } else if (
                props.coffeeStore &&
                props.coffeeStore.id !== undefined
            ) {
                id = props.coffeeStore.id;
            } else {
                id = router.asPath.split("/")[2];
            }
            const responseRecord = await fetch(
                `/api/getCoffeeStoreById?id=${id}`
            );
            const recordData = await responseRecord.json();
            if (recordData.length > 0) {
                setCoffeeStore(recordData[0]);
                setVotingCount(recordData[0].voting);
                return;
            } else {
                await handleCreateCoffeeStore(coffeeStore);
                setCoffeeStore(coffeeStore);
            }
        };
        if (isEmpty(props.coffeeStore)) {
            if (coffeeStores?.length > 0) {
                const coffeeStoreFromContext = coffeeStores.find(
                    (coffeeStore) => {
                        return coffeeStore.id.toString() === id;
                    }
                );
                if (coffeeStoreFromContext) {
                    handleValidateCreateStore(coffeeStoreFromContext);
                }
            }
        } else {
            handleValidateCreateStore(props.coffeeStore);
        }
    }, [id]);

    const { data, error } = useSWR(`/api/getCoffeeStoreById?id=${id}`, fetcher);

    const { address, name, neighbourhood, imgUrl, voting } = coffeeStore;

    useEffect(() => {
        const getCoffeeStore = async () => {
            let id = null;
            if (props.coffeeStore && props.coffeeStore.id !== undefined) {
                id = props.coffeeStore.id;
            } else {
                id = router.asPath.split("/")[2];
            }
            const responseRecord = await fetch(
                `/api/getCoffeeStoreById?id=${id}`
            );
            const recordData = await responseRecord.json();
            if (recordData.length > 0) {
                setCoffeeStore(recordData[0]);
                setVotingCount(recordData[0].voting);
                return;
            } else {
                await handleCreateCoffeeStore(coffeeStore);
                setCoffeeStore(coffeeStore);
            }
        };

        getCoffeeStore();
    }, []);

    useEffect(() => {
        if (data && data[0] !== undefined) {
            setVotingCount(data[0]?.voting);
        }
    }, [data]);

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    const handleUpvoteButton = async () => {
        try {
            const response = await fetch("/api/favouriteCoffeeStoreById", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id,
                }),
            });
            const dbCoffeeStore = await response.json();
            if (dbCoffeeStore && dbCoffeeStore.length > 0) {
                let count = votingCount + 1;
                setVotingCount(count);
            }
        } catch (err) {
            console.error("Error upvoting coffee store", err);
        }
    };

    if (error) {
        return <div>Something went wrong retrieving coffee store page</div>;
    }
    return (
        <>
            <div className={styles.layout}>
                <Head>
                    <title>{name}</title>
                    <meta name="description" content={`${name}`} />
                </Head>
                <div className={styles.container}>
                    <div className={styles.col1}>
                        <div className={styles.backToHomeLink}>
                            <Link href="/">← Back to home</Link>
                        </div>
                        <div className={styles.nameWrapper}>
                            <h1 className={styles.name}>{name}</h1>
                        </div>
                        <Image
                            alt="banner-image"
                            src={
                                imgUrl ||
                                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                            }
                            width={600}
                            height={360}
                            className={styles.storeImg}
                        />
                    </div>
                    <div className={cls("glass", styles.col2)}>
                        <div className={styles.iconWrapper}>
                            <Image
                                alt="near-me"
                                src="/static/icons/nearMe.svg"
                                width={24}
                                height={24}
                            />
                            <p className={styles.text}>{address}</p>
                        </div>

                        {neighbourhood && (
                            <div className={styles.iconWrapper}>
                                <Image
                                    alt="places"
                                    src="/static/icons/places.svg"
                                    width={24}
                                    height={24}
                                />
                                <p className={styles.text}>{neighbourhood}</p>
                            </div>
                        )}
                        <div className={styles.iconWrapper}>
                            <Image
                                alt="star"
                                src="/static/icons/star.svg"
                                width={24}
                                height={24}
                            />
                            <p className={styles.text}>{votingCount}</p>
                        </div>
                        <button
                            className={styles.upvoteButton}
                            onClick={handleUpvoteButton}
                        >
                            Upvote
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
