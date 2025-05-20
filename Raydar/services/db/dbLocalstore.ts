import { GeoPoint } from "firebase/firestore";
import {UserDocument} from "@/services/db/db";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CURRENT_KEY = "@currentLocation";
const FAVOURITES_KEY = "@favouriteLocations";

export const setUserdataToLocalstore = async (newUser:UserDocument)=>{
    try {
        await AsyncStorage.setItem(CURRENT_KEY, JSON.stringify(newUser.currentLocation));
        await AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify(newUser.favouriteLocations));
        return true;
    } catch (e) {
        console.error("Error adding document: ");
        console.log(e);
        return false;
    }
}

export const getUserdataFromLocalstore = async ()=>{
    let rawCurrent = await AsyncStorage.getItem(CURRENT_KEY);
    let rawFavourites = await AsyncStorage.getItem(FAVOURITES_KEY);

    if (!rawCurrent) rawCurrent = "";
    if (!rawFavourites) rawFavourites = "";


    const currentObj = JSON.parse(rawCurrent) as {latitude: number; longitude: number};
    const favArray = JSON.parse(rawFavourites) as Array<{latitude: number; longitude: number}>;

    const currentGeo = new GeoPoint(currentObj.latitude, currentObj.longitude);
    const favGeos = favArray.map(
        loc => new GeoPoint(loc.latitude, loc.longitude)
    );

    return {
        username: "",
        currentLocation: currentGeo,
        favouriteLocations: favGeos,
        notificationsEnabled: false
    };
}
