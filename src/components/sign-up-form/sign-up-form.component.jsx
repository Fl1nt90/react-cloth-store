import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import './sign-up-form.style.scss'

//initialize form values
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassowrd: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields); //useState passing default form fields
    const { displayName, email, password, confirmPassowrd} = formFields; //destructure in case i'll need

    const resetForm = () => {
        setFormFields(defaultFormFields); //set state to the original empty situation
    }

    const handleSubmit = async (event) => { //when submitting the form
        event.preventDefault(); 
        if (password !== confirmPassowrd) {
            alert('password do not match')
            return;
        };
        console.log(displayName);
        try {
            const response = await createAuthUserWithEmailAndPassword(email, password); //created auth
            /* now create the user reference on the database. REMEMBER i don't have displayName from auth, 
            so i'll pass additional data taken from the form */
            await createUserDocumentFromAuth({ ...response.user, displayName: displayName})
            
            //reset the state and so the form fields
            resetForm();

        } catch (err) { //catch errors, e.g. error 400 is sent back if user already exist in the DB
            if(err.code === 'auth/email-already-in-use') {
                alert('Email is already in use')
            } else if (err.code === 'auth/weak-password') {
                alert('Password should be at least 6 characters')
                console.log(err);
            } else {
                console.log('generic error in user creation')
            };
        }
    };

    //create a GENERIC funcion to update the state and re-render react
    const handleChange = (event) => {
        const {name, value} = event.target; //destructure to get these properties i passed 
        //this way, i will update only the appropriate field of the object (one at time)
        setFormFields({...formFields, [name]: value});
     }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>  {/* call-back function when form is submitted  */}
                {/*  i'm going to append to the data some attribute using the "name", so that i'll be able to identify 
                which type of data i passed via "event".
                The "value" will be the exact same value i just received from the form (anche validate), 
                because this is how useState and react works, re rendering the app  */}
                <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName}/>
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password}/>
                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassowrd' value={confirmPassowrd}/>
                <Button type="submit">Sign Up</Button> {/* NOTE: "Sign Up" is the CHILDREN*/}
            </form>
        </div> 
    )
}


export default SignUpForm;