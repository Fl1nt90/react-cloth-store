// import { useEffect } from "react"; //necessary for sign in with redirect
// import { getRedirectResult } from "firebase/auth"; //necessary for sign in with redirect

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.style.scss'

const Authentication = () => { //formerly SignIn

    //SIGN IN WITH REDIRECT
    // useEffect(() => {
    //     const getGoogleResponse = async () => {
    //         const response = await getRedirectResult(auth); //get auth after redirect from other page
            
    //         if (response) { //if we have a response, we create the doc reference on the database
    //             await createUserDocumentFromAuth(response.user) 
    //        };
    //     }
    //     getGoogleResponse(); //call it immediately
    // }, []); //passing an empty array as call-back function to make it run just once 

    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication; //formerly SignIn