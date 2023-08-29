import { initializeApp } from "firebase/app";
import {getFirestore, collection} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCQpyzMauaqRUOxUSaacGllAbeQ73ITdBs",
  authDomain: "filmyrate-d5ce6.firebaseapp.com",
  projectId: "filmyrate-d5ce6",
  storageBucket: "filmyrate-d5ce6.appspot.com",
  messagingSenderId: "401719962672",
  appId: "1:401719962672:web:32dc5922d691cd60db51f5"
};

const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const moviesRef= collection(db, "movies");
export const reviewsRef= collection(db, "reviews");
export const usersRef= collection(db, "users");
export default app;