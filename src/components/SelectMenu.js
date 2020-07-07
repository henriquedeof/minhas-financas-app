import React from "react";

//Functional component using arrow function
export default (props) => {

    const options = props.lista.map((option, index) => {
        return (
            <option key={index} value={option.value}>{option.label}</option>
        )
    });

    return(
        //spread operator
        <select {...props}>
            {options}
        </select>
    )

}