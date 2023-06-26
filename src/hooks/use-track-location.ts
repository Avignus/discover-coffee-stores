import {
    ACTION_TYPES,
    SetCoffeStoresActionKind,
    StoreContext,
} from "@/store/store-context";
import { useContext, useState } from "react";
const useTrackLocation = () => {
    const [locationErrorMsg, setLocationErrorMsg] = useState("");
    const [isFindingLocation, setIsFindingLocation] = useState(false);
    const { dispatch } = useContext(StoreContext);

    const success = (position: any) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocationErrorMsg("");
        setIsFindingLocation(false);
        if (dispatch) {
            dispatch({
                type: ACTION_TYPES.SET_LAT_LONG as SetCoffeStoresActionKind.SET_LAT_LONG,
                payload: { latLong: `${latitude},${longitude}` },
            });
        }
    };
    const error = () => {
        setLocationErrorMsg("Unable to retrieve your location");
        setIsFindingLocation(false);
    };

    const handleTrackLocation = () => {
        setIsFindingLocation(true);
        if (!navigator.geolocation) {
            const status = "Geolocation is not supported by your browser";
            setLocationErrorMsg(status);
            setIsFindingLocation(false);
        } else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    };

    return {
        handleTrackLocation,
        locationErrorMsg,
        isFindingLocation,
    };
};

export default useTrackLocation;
