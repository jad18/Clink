import React from 'react';

function FormButton(props) {
    return (
    <label>
        <input type = "checkbox"
                id = {props.value}
                value = {props.value}
                checked = {props.isChecked}
                onChange = {props.onChange} />
        {props.value}
    </label>
    );
}

export default FormButton;