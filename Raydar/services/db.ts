import {db} from "@/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";


export const addUserdata = async ()=>{

    try {
        const docRef = await addDoc(collection(db, "user"), {
            username: "test"
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Error adding document: ");
        console.log(e);
        return false;
    }
}

export const getUserdata = async ()=>{

    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {

        console.log(doc.data().username);
        console.log(doc.data().favouriteLocations.coordinates);

        // console.log(`${doc.id} => ${doc.data()}`);
    });

}