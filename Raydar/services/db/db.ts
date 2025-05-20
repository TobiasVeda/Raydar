import { GeoPoint } from "firebase/firestore";
import {getUserdataFromFirestore, setUserdataToFirestore} from "@/services/db/dbFirestore";
import { auth } from "@/firebaseConfig";
import {getUserdataFromLocalstore, setUserdataToLocalstore} from "@/services/db/dbLocalstore";

export interface UserDocument{
    username: string,
    currentLocation: GeoPoint,
    favouriteLocations: GeoPoint[],
    notificationsEnabled: boolean
}

export const setUserdata = async (newUser:UserDocument)=>{
    if (auth.currentUser){
        console.log("Setting user data from firebase");
        return await setUserdataToFirestore(newUser);
    } else{
        console.log("Setting user data from local storage");
        return await setUserdataToLocalstore(newUser);
    }
}

export const getUserdata = async ()=>{
    if (auth.currentUser){
        console.log("Getting user data from firebase");
        return await getUserdataFromFirestore();
    } else{
        console.log("Getting user data locally");
        return await getUserdataFromLocalstore();
    }
}
