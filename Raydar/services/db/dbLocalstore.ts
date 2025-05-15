import { GeoPoint } from "firebase/firestore";
import {UserDocument} from "@/services/db/db";

export const setUserdataToLocalstore = async (newUser:UserDocument)=>{
    try {
        // Set user data
        return true;

    } catch (e) {
        console.error("Error adding document: ");
        console.log(e);
        return false;
    }
}

export const getUserdataFromLocalstore = async ()=>{

    // return user data
}
