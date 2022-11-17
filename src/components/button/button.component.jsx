import './button.style.scss'

//create a variable for button type (default, inverted, google sign-in)
const BUTTON_TYPE_CLASSES = {
    google: 'google-sign-in',
    inverted: 'inverted',
}

//NOTE
const Button = ({children, buttonType, ...otherProps}) => {  
    return (
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children} {/* using "children" will automatically render what i wrote in the component text */}
        </button>
    )
}

export default Button;