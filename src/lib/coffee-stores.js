//initialize unsplash
import { createApi } from "unsplash-js";
const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;

const unsplashApi = createApi({
    accessKey,
});
const getUrlForCoffeeStores = (latLong, limit, query) => {
    return `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&limit=${limit}`;
};

const getListOfCoffeeStorePhotos = async () => {
    const photos = await unsplashApi.search.getPhotos({
        query: "coffee shop",
        page: 1,
        perPage: 40,
        color: "green",
        orientation: "portrait",
    });
    const unsplashResults = photos.response.results;
    const photosResponse = unsplashResults.map(
        (result) => result.urls["small"]
    );
    return photosResponse;
};
export const fetchCoffeeStores = async (
    latLong = "43.65267326999575,-79.39545615725015",
    limit = 6
) => {
    const photos = await getListOfCoffeeStorePhotos();
    const url = getUrlForCoffeeStores(latLong, limit, "coffee");
    let coffeeStoresData = "";
    const response = await fetch(url, {
        method: "get",
        headers: {
            Accept: "application/json",
            Authorization: `fsq3w/aJU5JAwF4+uFm1woYpIWUkrrEcGAfZRXY4Q9UFcmc=`,
        },
    });
    coffeeStoresData = await response.text();
    // console.log(JSON.stringify(JSON.parse(coffeeStoresData), null, 2));
    coffeeStoresData = await JSON.parse(coffeeStoresData);
    return coffeeStoresData.results?.map((venue, index) => {
        return {
            // ...venue,
            id: venue.fsq_id,
            name: venue.name,
            address: venue.location.address,
            neighbourhood:
                venue.location.address_extended ||
                venue.location.cross_street ||
                "",
            imgUrl: photos[index],
        };
    });
};
