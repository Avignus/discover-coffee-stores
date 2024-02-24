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

const initialState: CarsStoreState = {
    state: {
        carsList: [],
        loading: false,
    },
    dispatch: () => null,
}

export type CarStoresPayload = {
    carsList?: Promise<Array<CarItem>>
    loading?: boolean
}
type CarsStoreState = {
    state: {
        carsList: Array<CarItem>
        loading: false
    }
    dispatch: Dispatch<CarsListAction>
}
export const ACTION_TYPES = {
    SET_CARS_LIST: "SET_CARS_LIST",
    SET_LOADING: "SET_LOADING",
}

export enum SetCarsListActionKind {
    SET_CARS_LIST = "SET_CARS_LIST",
    SET_LOADING = "SET_LOADING",
}
type TypeAction =
    | SetCarsListActionKind.SET_CARS_LIST
    | SetCarsListActionKind.SET_LOADING

export type CarsListAction = {
    type: TypeAction
    payload: CarStoresPayload
}

const storeReducer = (state: CarsStoreState, action: CarsListAction): any => {
    switch (action.type) {
        case ACTION_TYPES.SET_CARS_LIST: {
            return { ...state, carsList: action.payload.carsList }
        }
        case ACTION_TYPES.SET_LOADING: {
            return {
                ...state,
                loading: action.payload.loading,
            }
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
