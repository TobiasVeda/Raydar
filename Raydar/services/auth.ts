import { auth } from "@/firebaseConfig";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";


export const signUp = async (email:string, password:string) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // console.log("W");
        // console.log(user);
        return true;
    } catch (e) {
        // const errorCode = e.code;
        // const errorMessage = e.message;
        console.log("Error signing up:");
        console.log(e);
        return false;
    }

}


export const signIn = async (email:string, password:string) => {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // console.log("W");
        // console.log(user);
        return true;
    } catch (e) {
        // const errorCode = e.code;
        // const errorMessage = e.message;
        console.log("Error signing in:");
        console.log(e);
        return false;
    }

}

export const signUserOut = async () => {

    try {
        const userCredential = await signOut(auth)
        // console.log("Signed out");
        return true;
    } catch (e) {
        console.log("Error signing out:");
        console.log(e);
        return false;
    }

}

// onAuthStateChanged(auth, (user) => {
//     console.log(user);
//     if (user) {
//         // User is signed in, see docs for a list of available properties
//         // https://firebase.google.com/docs/reference/js/auth.user
//         const uid = user.uid;
//         // ...
//         console.log("sign in");
//     } else {
//         // User is signed out
//         // ...
//         console.log("sign out");
//     }
// });