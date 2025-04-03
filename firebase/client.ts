import {initializeApp, getApp, getApps} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD1xu45znlwZiOjEClbGA3tL7R3hVKVvSo",
    authDomain: "prepwise-99b0f.firebaseapp.com",
    projectId: "prepwise-99b0f",
    storageBucket: "prepwise-99b0f.firebasestorage.app",
    messagingSenderId: "783752132406",
    appId: "1:783752132406:web:ca79805d75261681082597",
    measurementId: "G-MD29P6VHT5"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);