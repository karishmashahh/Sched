import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyARcOWnJBORqCA6yLw0kfrKEj7D29s-WEA",
    authDomain: "todo-app-a20bc.firebaseapp.com",
    projectId: "todo-app-a20bc",
    storageBucket: "todo-app-a20bc.appspot.com",
    messagingSenderId: "991773951425",
    appId: "1:991773951425:web:08f8f2b134b2b8a7455b40"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

