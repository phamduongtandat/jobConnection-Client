import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDEgrYGFSkKfjHFX4RqAd5mSMjeHnplqXI",
    authDomain: "e-ecommerce-8f6b3.firebaseapp.com",
    projectId: "e-ecommerce-8f6b3",
    storageBucket: "e-ecommerce-8f6b3.appspot.com",
    messagingSenderId: "795246047480",
    appId: "1:795246047480:web:a2929299417abb20e0cb0d",
    measurementId: "G-SMQ3W7VBKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
