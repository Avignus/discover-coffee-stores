import Image from "next/image"
import Link from "next/link"
import styles from "../styles/card.module.css"
import cls from "classnames"
import { CarsListAction, StoreContext } from "@/store/store-context"
import { Dispatch, useContext } from "react"
import { setLoading, dispatchCarsList } from "@/lib/cars-list"
import { baseUrl } from "@/lib/config"
interface props {
    id: string
    name: string
    imgUrl: string
    href: string
    className: string
}
const Card = (props: props) => {
    const { dispatch, state } = useContext(StoreContext)

    const deleteCar = async (id: string) => {
        try {
            // setLoading(dispatch, {
            //     loading: true,
            // })

            const response = await fetch(`${baseUrl}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
            if (response) {
                dispatchCarsList(dispatch)
            }
            console.log({ response })
        } catch (error) {
            console.error("Error sending request:", error)
        } finally {
            dispatchCarsList(dispatch)
            // setLoading(dispatch, {
            //     loading: false,
            // })
        }
    }

    return (
        <div className={cls("glass", styles.container)}>
            <div className={styles.cardHeaderWrapper}>
                <h2 className={styles.cardHeader}>{props.name}</h2>
                <Image
                    style={{ zIndex: 2 }}
                    onClick={() => deleteCar(props.id)}
                    className="trashCan"
                    alt="trash-can-icon"
                    src="/static/icons/trash-can-gray.png"
                    width={40}
                    height={40}
                />
            </div>
            {state.loading ? (
                <>Loading</>
            ) : (
                <Link className={props.className} href={props.href}>
                    <>
                        <div className={styles.cardImageWrapper}>
                            <Image
                                className={styles.cardImage}
                                src={props.imgUrl}
                                width={260}
                                height={160}
                                alt={props.name}
                            />
                        </div>
                    </>
                </Link>
            )}
        </div>
    )
}

export default Card
