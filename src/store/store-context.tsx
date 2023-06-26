import { createContext, useReducer } from "react";
import { Dispatch } from "react";
const initialState: CoffeeStoresState = {
    state: {
        coffeeStores: [""],
        latLong: "",
    },
    dispatch: null,
};

export type CoffeeStoresPayload = {
    latLong?: string;
    coffeeStores?: Array<any>;
};
type CoffeeStoresState = {
    state: {
        coffeeStores: Array<any>;
        latLong: string;
    };
    dispatch: Dispatch<CoffeeStoresAction> | null;
};
export const ACTION_TYPES = {
    SET_LAT_LONG: "SET_LAT_LONG",
    SET_COFFEE_STORES: "SET_COFFEE_STORES",
};

export enum SetCoffeStoresActionKind {
    SET_LAT_LONG = "SET_LAT_LONG",
    SET_COFFEE_STORES = "SET_COFFEE_STORES",
}
type TypeAction =
    | SetCoffeStoresActionKind.SET_COFFEE_STORES
    | SetCoffeStoresActionKind.SET_LAT_LONG;
type CoffeeStoresAction = {
    type: TypeAction;
    payload: CoffeeStoresPayload;
};

const storeReducer = (
    state: CoffeeStoresState,
    action: CoffeeStoresAction
): any => {
    switch (action.type) {
        case ACTION_TYPES.SET_LAT_LONG: {
            return { ...state, latLong: action.payload.latLong };
        }
        case ACTION_TYPES.SET_COFFEE_STORES: {
            return { ...state, coffeeStores: action.payload.coffeeStores };
        }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};
export const StoreContext = createContext(initialState);
type ContextProps = {
    children: JSX.Element;
};

const StoreProvider = ({ children }: ContextProps) => {
    const [state, dispatch] = useReducer(storeReducer, initialState);
    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreProvider;
