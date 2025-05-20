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
        console.log("Set user data");
        await setUserdataToFirestore(newUser);
    } else{
        // Replace with local storage
        console.log("Set local storage");
        await setUserdataToLocalstore(newUser);
    }
}

export const getUserdata = async (): Promise<UserDocument>=>{
    if (auth.currentUser){
        console.log("Get user data");
        return await getUserdataFromFirestore();
    } else{
        // Replace with local storage
        console.log("Get local storage");
        return await getUserdataFromLocalstore();
    }
}
