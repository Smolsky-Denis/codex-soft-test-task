import React from 'react';

function Title(props) {
    let {className, sizeFont, text} = props.data;
    return (
        <div className={className}>
                <span className={sizeFont}>{text}</span>
        </div>
    )
}

export default Title;
