import { GeoPoint } from "firebase/firestore";
import {getUserdataFromFirestore, setUserdataToFirestore} from "@/services/db/dbFirestore";
import { auth } from "@/firebaseConfig";

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
        // Replace with local storage
        return await setUserdataToFirestore(newUser);
    }
}

export const getUserdata = async ()=>{
    if (auth.currentUser){
        return await getUserdataFromFirestore();
    } else{
        // Replace with local storage
        return await getUserdataFromFirestore();
    }
}
