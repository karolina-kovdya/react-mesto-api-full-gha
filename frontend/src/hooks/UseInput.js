import React from "react";
import UseValidation from "./UseValidation";

export function UseInput (initialValue, validations) {
    const [value, setValue] = React.useState(initialValue);
    const [isDirty, setIsDirty] =React.useState(false);
    const valid = UseValidation(value, validations)

    function onChange (e) {
        setValue(e.target.value)
    }

    function onBlur () {
        setIsDirty(true)
    }

    return {
        value,
        onChange,
        onBlur, 
        isDirty,
        ...valid
    }
}