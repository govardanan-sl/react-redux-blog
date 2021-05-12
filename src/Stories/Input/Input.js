import React from 'react';
import './Input.scss';

function Input(props) {
    const {size = 'sm' , children,...rest} = props;
    return (
        <div>
            <input {...rest} className={`input ${size}`}>
                {children}
            </input>
        </div>
    );
}

export default Input;