import React from 'react';
import '../../App.css'

function Paragraph(props) {
    let result = props.data.showResult();
    return (
        <div className='canvas col-md-12'>
            {result && result.length ? result.map((item, index) => {
                return <span key={index}>{item.replace(/ /g, "\u00a0")}<br/></span>
            }) : null}
        </div>
    )
}

export default Paragraph
