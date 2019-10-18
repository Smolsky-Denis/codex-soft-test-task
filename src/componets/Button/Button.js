import React from 'react';

function Button(props) {
    let {name, className, onClick, classNameButton} = props.data;
    return (
        <div className={className}>
            <button className={classNameButton} onClick={() => onClick()}>{name}</button>
        </div>
    )
}

export default Button;
