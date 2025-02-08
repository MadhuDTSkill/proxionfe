import React from 'react'
import { Outlet } from 'react-router-dom'
import BG from '../assets/images/bg4.png'

const RootLayout = () => {
  return (
    <div
      className='flex flex-col p-2 h-dvh bg-cover font-main bg-center bg-no-repeat bg-gradient-to-r from-[#030014] via-[#0d0725] to-[#030014] text-gray-400 overflow-auto'
      style={{
        backgroundImage: `url(${BG})`
      }}
    >
      <div className='flex-1 w-full flex flex-col h-full overflow-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout
