import { createContext, useReducer } from "react"
import { Dispatch } from "react"

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

const initialState: CoffeeStoresState = {
    state: {
        carsList: [],
        latLong: "",
    },
    dispatch: null,
}

export type CarStoresPayload = {
    latLong?: string
    carsList?: Promise<Array<CarItem>>
}
type CoffeeStoresState = {
    state: {
        carsList: Array<CarItem>
        latLong: string
    }
    dispatch: Dispatch<CarsListAction> | null
}
export const ACTION_TYPES = {
    SET_LAT_LONG: "SET_LAT_LONG",
    SET_COFFEE_STORES: "SET_CARS_LIST",
}

export enum SetCarsListActionKind {
    SET_LAT_LONG = "SET_LAT_LONG",
    SET_CARS_LIST = "SET_CARS_LIST",
}
type TypeAction =
    | SetCarsListActionKind.SET_CARS_LIST
    | SetCarsListActionKind.SET_LAT_LONG
export type CarsListAction = {
    type: TypeAction
    payload: CarStoresPayload
}

const storeReducer = (
    state: CoffeeStoresState,
    action: CarsListAction
): any => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LONG: {
            return { ...state, latLong: action.payload.latLong }
        }
        case ACTION_TYPES.SET_COFFEE_STORES: {
            return { ...state, carsList: action.payload.carsList }
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`)
    }
}
export const StoreContext = createContext(initialState)
type ContextProps = {
    children: JSX.Element
}

const StoreProvider = ({ children }: ContextProps) => {
    const [state, dispatch] = useReducer(storeReducer, initialState)
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    )
}

export default StoreProvider
