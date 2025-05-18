import {getUserdata, setUserdata} from "@/services/db/db";
import {GeoPoint} from "firebase/firestore";
import {getNameFromCoordinate} from "@/services/geocode";

export const getFavouriteState = async (lat:number, lon:number)=>{
    let document = await getUserdata();
    if (!document){
        return false;
    }
    let search = await getNameFromCoordinate(lat, lon);

    for (let i = 0; i < document.favouriteLocations.length; i++) {
        let compare = await getNameFromCoordinate(document.favouriteLocations[i].latitude, document.favouriteLocations[i].longitude);

        if (compare == search){
            return true;
        }
    }
    return false;
}

export const addAsFavourite = async (lat:number, lon:number)=>{
    let document = await getUserdata();
    if (!document){
        return false;
    }
    document.favouriteLocations.push(new GeoPoint(lat, lon));
    return await setUserdata(document);
}

export const removeAsFavourite = async (lat:number, lon:number)=>{
    let document = await getUserdata();
    if (!document){
        return false;
    }
    let search = await getNameFromCoordinate(lat, lon);

    for (let i = 0; i < document.favouriteLocations.length; i++) {
        let compare = await getNameFromCoordinate(document.favouriteLocations[i].latitude, document.favouriteLocations[i].longitude);

        if (compare == search){
            document.favouriteLocations.splice(i, 1);
            await setUserdata(document);
            return true;
        }
    }
    return false;
}