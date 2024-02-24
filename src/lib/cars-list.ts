import {
    CarItem,
    CarStoresPayload,
    SetCarsListActionKind,
} from "@/store/store-context"
import { Dispatch } from "react"
import { CarsListAction } from "@/store/store-context"
import { baseUrl } from "./config"
export const fetchCarsList = async (): Promise<Array<CarItem> | undefined> => {
    try {
        const response = await fetch(`${baseUrl}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`)
        }

        const data = await response?.json()

        return data ? data : ([] as Array<CarItem>)
    } catch (err) {
        console.error(`Error trying to fetch carsList: ${err}`)
        return undefined
    }
}

export const dispatchCarsList = async (dispatch: Dispatch<CarsListAction>) => {
    try {
        const response = await fetch(`${baseUrl}`)
        const carsList = await response.json()
        dispatch({
            type: SetCarsListActionKind.SET_CARS_LIST,
            payload: { carsList },
        })
    } catch (err: any) {
        const errorMessage = err.message
        throw new Error(errorMessage)
    }
}

export const setLoading = (
    dispatch: Dispatch<CarsListAction>,
    payload: CarStoresPayload
) => {
    dispatch({
        type: SetCarsListActionKind.SET_LOADING,
        payload,
    })
}
