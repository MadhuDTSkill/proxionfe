'use client'
import React from 'react'

const Input = ({ className = '', extraClassName = '', ...props }) => {

    return (
        <input
            className={
                className 
                ? className 
                : 'bg-transparent text-white p-2 px-3 m-1 outline-none border-b transition-all duration-200' + 
                ' ' + extraClassName || ''
            }
            {...props}
        />
    );
};

// Input.defaultProps = {
//     className: '',
//     extraClassName: '',
//     placeholder: 'Enter text here...',
// };

export default Input;
