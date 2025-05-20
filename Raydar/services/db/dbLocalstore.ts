import { GeoPoint } from "firebase/firestore";
import {UserDocument} from "@/services/db/db";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const setUserdataToLocalstore = async (newUser:UserDocument)=>{
    try {
        const currentLocation = JSON.stringify(newUser.currentLocation);
        const favouriteLocation = JSON.stringify(newUser.favouriteLocations);

        await AsyncStorage.setItem('@currentLocation', currentLocation);
        await AsyncStorage.setItem('@favouriteLocation', favouriteLocation);
        return true;
    } catch (e) {
        console.error("Error adding document: ");
        console.log(e);
        return false;
    }
}

export const getUserdataFromLocalstore = async ()=>{
    let temp:UserDocument[] = [];

    const currentLocation = await AsyncStorage.getItem('@currentLocation');
    const currentLocationObj:
        | { latitude: number; longitude: number }
        | null = currentLocation ? JSON.parse(currentLocation) : null

    const favouriteLocation = await AsyncStorage.getItem('@favouriteLocations');
    const favouriteLocationObj:
        | { latitude: number; longitude: number }[]
        | [] = currentLocation ? JSON.parse(currentLocation) : []


    if (!currentLocationObj) {
        throw new Error('No location saved in local storage');
    }
    const currLocation = new GeoPoint(
        currentLocationObj.latitude,
        currentLocationObj.longitude
    )

    const favLocations = favouriteLocationObj.map(
        location => new GeoPoint(location.latitude, location.longitude)
    )

    const user: UserDocument = {
        username: '',
        currentLocation: currLocation,
        favouriteLocations: favLocations,
        notificationsEnabled: false
    }

    temp.push(user);

    return temp[0];
}
