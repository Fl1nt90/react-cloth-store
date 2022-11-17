import { useEffect } from "react"; //necessary for sign in with redirect
import { getRedirectResult } from "firebase/auth"; //necessary for sign in with redirect

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, } from "../../utils/firebase/firebase.utils";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {

    useEffect(() => {
        const getGoogleResponse = async () => {
            const response = await getRedirectResult(auth); //get auth after redirect from other page
            
            if (response) { //if we have a response, we create the doc reference on the database
                await createUserDocumentFromAuth(response.user) 
           };
        }
        getGoogleResponse(); //call it immediately
    }, []); //passing an empty array as call-back function to make it run just once 


    const logGoogleUsers = async () => {
        const {user} = await signInWithGooglePopup(); //destructure
        createUserDocumentFromAuth(user) //send log in data to firebase
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUsers}>Sign in with Google</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google redirect</button>

            <SignUpForm />
        </div>
    )
}

export default SignIn;