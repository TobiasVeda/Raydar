import { auth } from "@/firebaseConfig";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    deleteUser as firebaseDeleteUser,
    onAuthStateChanged,
    signOut, sendEmailVerification
} from "firebase/auth";

export const signUp = async (email:string, password:string) => {

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        await sendEmailVerification(user);
        await signOut(auth);
        alert("Verification email sent");

        return true;
    } catch (e) {
        console.log("Error signing up:");
        console.log(e);
        return false;
    }

}


export const signIn = async (email:string, password:string) => {

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified){
            await signOut(auth);
            return 2;
        }
        return 1;
    } catch (e) {
        console.log("Error signing in:");
        console.log(e);
        return -1;
    }

}

export const signUserOut = async () => {

    try {
        await signOut(auth)
        return true;
    } catch (e) {
        console.log("Error signing out:");
        console.log(e);
        return false;
    }

}

export const deleteCurrentUser = async () => {
    const user = auth.currentUser;

    if (!user) {
        console.log("No user is currently logged in.");
        return { success: false, error: "No user logged in" };
    }

    try {
        await firebaseDeleteUser(user);
        console.log("User deleted");
        return true;
    } catch (error: any) {
        console.log("Error deleting user:", error);
        return false;
    }
};