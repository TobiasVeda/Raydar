// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBEUUmxhpEnHEHAka79MdQzVJRgQd9qdFw",
	authDomain: "ikt205-raydar.firebaseapp.com",
	projectId: "ikt205-raydar",
	storageBucket: "ikt205-raydar.firebasestorage.app",
	messagingSenderId: "132194596424",
	appId: "1:132194596424:web:db8e89229a97283ccbca7d",
	measurementId: "G-H980EF6FLL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }