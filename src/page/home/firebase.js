import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDRdK6842OqTn1uWFWBjiN380B886rEb7A",
    authDomain: "casemd6-8d319.firebaseapp.com",
    projectId: "casemd6-8d319",
    storageBucket: "casemd6-8d319.appspot.com",
    messagingSenderId: "407960564221",
    appId: "1:407960564221:web:82923069cedbae7f78a994",
    measurementId: "G-0QSQ0517Y5"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);