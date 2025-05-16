import {db} from "@/firebaseConfig";
import {collection, getDocs, setDoc, doc} from "firebase/firestore";
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
            username: "tobias",
            currentLocation: new GeoPoint(58.3405, 8.59343),
            favouriteLocations: [
                new GeoPoint(58.3405, 8.59343),
                new GeoPoint(58.3405, 8.59343)
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
