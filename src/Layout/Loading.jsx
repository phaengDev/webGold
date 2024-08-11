import React from 'react'
import { Commet } from 'react-loading-indicators';
const Loading=({size, text, textColor, })=> {
    const spinnerStyle = {
        position: 'relative',
        display: 'inline-block',
        textAlign: 'center',
    };

    const imgStyle = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50px',  // Adjust the size as needed
        height: '50px', // Adjust the size as needed
    };

  return (
    <div className={`commet-spinner ${size}`} style={spinnerStyle}>
    {<img src='/assets/img/logo/logo.png' alt="Loading" style={imgStyle} />}
    <Commet color="#e91717" size={size} />
    <div className="spinner-text" style={{ color: textColor, marginTop: '10px' }}>
        {text}
    </div>
</div>
  )
}

export default Loading