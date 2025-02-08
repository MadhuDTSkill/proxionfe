import React, { useEffect } from 'react'
import { ReactTyped } from 'react-typed'

const Redirecting = ({
    message = 'Redirecting',
    to = '/chat'
}) => {
    useEffect(()=>{
      setTimeout(()=>{
        window.location.href = to
      },2000)

    },[])

  return (
    <div className='h-screen flex justify-center items-center'>
        <h1 className='animate-pulse'>{message}</h1>
    </div>
  )
}

export default Redirecting