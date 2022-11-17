import { useState } from "react";
import { signInAuthUserWithEmailAndPassword, signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.style.scss'
    

const SignInForm = () => {
    //initialize form values (the STATE)
    const defaultFormFields = {
        email: '',
        password: '',
    }

    const [formFields, setFormFields] = useState(defaultFormFields); //useState passing default form fields
    const {email, password} = formFields; //destructure in case i'll need

//function to clear form fields
    const resetForm = () => {
        setFormFields(defaultFormFields); //set state to the original empty situation
    }

//create a GENERIC funcion to update the state and re-render react
    const handleChange = (event) => {
        const {name, value} = event.target; //destructure to get these properties i passed 
        //this way, i will update only the appropriate field of the object (one at time)
        setFormFields({...formFields, [name]: value});
     }

    
//when sign-in form is submitted
    const handleSubmit = async (event) => { //when submitting the form
        event.preventDefault(); 
        try {
            const userCredential = await signInAuthUserWithEmailAndPassword(email, password)
            console.log(userCredential);
        } catch(err) {
            if(err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
            alert('Invalid username or password')
        };
    };
        resetForm();
    };


//SIGN IN WITH GOOGLE POP UP
    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup(); //destructure
        createUserDocumentFromAuth(user) //send log in data to firebase
    }

    return (
        <div className="sign-in-container">
            <h2>Welcome back</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>  {/* call-back function when form is submitted  */}
                {/*  i'm going to append to the data some attribute using the "name", so that i'll be able to identify 
                which type of data i passed via "event".
                The "value" will be the exact same value i just received from the form (anche validate), 
                because this is how useState and react works, re rendering the app  */}
               
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                
                <div className="buttons-container">
                    <Button type="submit">Sign In</Button>  {/* NOTE: "Sign Up" is the CHILDREN*/}
                    <Button type='button' onClick={signInWithGoogle} buttonType='google'>Google Sign In</Button>
                    {/* NOTE: i specify type='button' because by default every button submit a form on the page*/}
                </div>

            </form>
        </div>
    )
}

export default SignInForm;