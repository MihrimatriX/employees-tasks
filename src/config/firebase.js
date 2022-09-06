import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDSAS33zWSPMDpGFZuP7gxjnSQDiC_J1Fw",
    authDomain: "employee-schedule-16701.firebaseapp.com",
    projectId: "employee-schedule-16701",
    storageBucket: "employee-schedule-16701.appspot.com",
    messagingSenderId: "512666742219",
    appId: "1:512666742219:web:6e85eb3792f3d343941a4e"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);