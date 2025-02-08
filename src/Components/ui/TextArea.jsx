'use client'
import React from 'react'

const TextArea = ({ className = '', extraClassName = '', ...props }) => {
  return (
    <textarea
    className={
        className 
        ? className 
        : 'bg-transparent text-white p-2 px-3 m-1 outline-none border-b transition-all duration-200' + 
        ' ' + extraClassName || ''
        }
        {...props}
    />
  )
}

export default TextArea

// TextArea.defaultProps = {
//     className: '',
//     extraClassName: '',
//     placeholder: 'Enter text here...',
// };