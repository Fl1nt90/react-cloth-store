import './form-input.style.scss';

const FormInput = ({label, ...othersProps}) => {
    return (
        <div className='group'>
            <input className='form-input' {...othersProps} /> 
            {label && // DON'T RENDER A LABEL IF there is no label, SHORT CIRCUIT OPERATOR
            /* dinamic class: if the there is "leght" property in other props, meaning if user 
            has typed something, i want the label to SHRINK*/
            <label className={`${othersProps.value ? 'shrink' : ''} form-input-label`}>{label}</label>}
        </div>
    )
} 

export default FormInput;