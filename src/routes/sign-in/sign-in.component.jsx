import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";


const SignIn = () => {
    //
    const logGoogleUsers = async () => {
        const {user} = await signInWithGooglePopup(); //destructure
        const userDocRef = await createUserDocumentFromAuth(user) //send log in data to firebase
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUsers}>Sign in with Google</button>
        </div>
    )
}

export default SignIn;