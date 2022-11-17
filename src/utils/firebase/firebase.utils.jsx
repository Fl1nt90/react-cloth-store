// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, signInWithEmailAndPassword, GoogleAuthProvider, createUserWithEmailAndPassword, reauthenticateWithRedirect } from "firebase/auth"; //import authentication libraries
import { getFirestore, doc, getDoc , setDoc } from 'firebase/firestore'; /* import method for FIRESTORE 
NOTE: getDoc and setDoc are actually used to access and set document's data, not the documents themselves*/



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDP0uJvsRRqsvWa1puryOkU1wMhyJqkLo",
  authDomain: "react-cloth-shop-db.firebaseapp.com",
  projectId: "react-cloth-shop-db",
  storageBucket: "react-cloth-shop-db.appspot.com",
  messagingSenderId: "51187331382",
  appId: "1:51187331382:web:de5a493418dd3a26b84397"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// initialize a provider for authentication (KIND OF STANDARD CONFIGURATION)
const googleProvider = new GoogleAuthProvider(); 
//set up some custom parameters on this provider
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

//export authentication to create the instance
export const auth = getAuth(); //basically the memory of the authentication
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider); //sign in with google popup
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); //sign in with google redirect



//CREATE THE DATABASE
export const db = getFirestore(); //i will pass this instance to various method every time i want to interact with the database

//create a method that take data from authentication and store into the database
export const createUserDocumentFromAuth = async (userAuth) => {
    if (!userAuth) return;
    //1) check if there is an existing user reference
    //even if we don't have any collection/documents reference inside DB, firebase will automatically create it
    const userDocRef = doc(db, 'users', userAuth.uid) //arguments are the database, the collection, and an identifier
    //2 check/get data from the database
    //create a user snapshot to check wheter or not there is an instance that exist inside the database
    const userSnapshot = await getDoc(userDocRef); 
    //3) now i will use a method to check if this object exist on the database, and in case create it
    if (!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date(); //create a constante to store the date
        //setDoc is an async, so i want to catch errors in case
        try {
            await setDoc(userDocRef, {displayName, email, createdAt})
        } catch (err) {
            console.log('error creating the user', err.message);
        }
    };


    return userDocRef; //if the reference already exist, just return it (send it in sign-in component)
};


 //create an user with EMAIL and PASSWORD. This will return back and auth object of the user
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; 
    
    return await createUserWithEmailAndPassword(auth, email, password);
}

//SIGN-IN with EMAIL and PASSWORD
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return; 
    
    return await signInWithEmailAndPassword(auth, email, password)
}