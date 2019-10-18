import React from 'react';

function Input(props) {
    let {className, type, placeholder, onKeyPress} = props.data;
    return (
        <div className={`form-group ${className}`} onKeyPress={onKeyPress}>
            <label className={className}>
                <input className={`form-control`} type={type} placeholder={placeholder}/>
            </label>
        </div>
    )
}

export default Input;
