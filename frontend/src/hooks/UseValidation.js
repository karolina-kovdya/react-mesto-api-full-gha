import React, { useState } from "react";

function UseValidation (value, validations) {
    const [isEmpty, setIsEmpty] = React.useState(true);
    const [minLengthError, setMinLengthError] = useState('')
    const [maxLengthError, setMaxLengthError] = useState('');
    const [emailError, setEmailError] = useState('')

    React.useEffect(()=> {
        for (const validation in validations) {
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError('Это поле должно содержать не менее 3 символов') : setMinLengthError('');

                    break;
                
                case 'maxLength':
                    value.length > validations[validation] ? setMaxLengthError('Это поле должно содержать не более 30 символов') : setMaxLengthError('');

                    break;

                case 'isEmpty':
                    value ? setIsEmpty(false) : setIsEmpty(true);

                    break;

                case 'isEmail':
                    const re = /^\S+@\S+\.\S+$/;
                    re.test(value) ? setEmailError('') : setEmailError('Неккоректный email')

                    break;

                    default:
            }
        }
    },[validations,value])

    return {
        isEmpty, 
        minLengthError,
        maxLengthError,
        emailError,
    }
}

export default UseValidation;