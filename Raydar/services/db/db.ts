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
        return await setUserdataToFirestore(newUser);
    } else{
        return await setUserdataToLocalstore(newUser);
    }
}

export const getUserdata = async ()=>{
    if (auth.currentUser){
        return await getUserdataFromFirestore();
    } else{
        return await getUserdataFromLocalstore();
    }
}
