import {db} from "@/firebaseConfig";
import {collection, getDocs, setDoc, doc} from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";
import {getAuth} from "firebase/auth";


export interface UserDocument{
    username: string,
    currentLocation: GeoPoint,
    favouriteLocations: GeoPoint[],
    notificationsEnabled: boolean
}

export const setUserdata = async (newUser:UserDocument)=>{
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        const docRef = await setDoc(doc(db, "user", user!.uid), { // throw if user=null
            username: newUser.username,
            currentLocation: newUser.currentLocation,
            favouriteLocations: newUser.favouriteLocations,
            notificationsEnabled: newUser.notificationsEnabled
        });
        // console.log("Document written");
        return true;

    } catch (e) {
        console.error("Error adding document: ");
        console.log(e);
        return false;
    }
}

export const getUserdata = async ()=>{
    let temp:UserDocument[] = [];

    // Should only be able to retrieve collections with matching userId based on rules
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
        temp.push({
            username: doc.data().username,
            currentLocation: doc.data().currentLocations,
            favouriteLocations: doc.data().favouriteLocations,
            notificationsEnabled: doc.data().notificationsEnabled
        });
    });
    return temp[0];
}
