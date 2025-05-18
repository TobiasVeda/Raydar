import {db} from "@/firebaseConfig";
import {collection, getDocs, setDoc, doc, getDoc} from "firebase/firestore";
import { GeoPoint } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {UserDocument} from "@/services/db/db";




export const setUserdataToFirestore = async (newUser:UserDocument)=>{
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

export const testPush = async ()=>{
    // TESTING ONLY
    try {
        const auth = getAuth();
        const user = auth.currentUser;

        const docRef = await setDoc(doc(db, "user", user!.uid), { // throw if user=null
            username: "tobiasveda",
            currentLocation: new GeoPoint(58.3405, 8.59343),
            favouriteLocations: [
                new GeoPoint(58.3405, 8.59343),
                new GeoPoint(39.56939, 2.65024),
                new GeoPoint(68.3405, 8.59343),
                new GeoPoint(-1, -1),
                new GeoPoint(0, 0),
            ],
            notificationsEnabled: true
        });
        // console.log("Document written");
        return true;

    } catch (e) {
        console.error("Error adding document: ");
        console.log(e);
        return false;
    }
}

export const getUserdataFromFirestore = async ()=>{

    try {
        const auth = getAuth();
        const user = auth.currentUser;

        let temp:UserDocument[] = [];

        // Should only be able to retrieve collections with matching userId based on rules
        const docSnap = await getDoc(doc(db, "user", user!.uid)); // throw if user=null

            temp.push({
                username: docSnap.data()!.username,
                currentLocation: docSnap.data()!.currentLocation,
                favouriteLocations: docSnap.data()!.favouriteLocations,
                notificationsEnabled: docSnap.data()!.notificationsEnabled
            });

        return temp[0];

    } catch (e) {
        console.error("Error getting document: ");
        console.log(e);
        return null;
    }
}
