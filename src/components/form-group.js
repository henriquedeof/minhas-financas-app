import React from 'react';

//Function component. Important to pass the parameter props when it is a function.
function FormGroup(props){
    return(
        <div className="form-group">
            <label htmlFor={props.htmlFor}>{props.label}</label>
            {props.children}
        </div>
    )
}

export default FormGroup;
