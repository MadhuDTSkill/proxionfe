import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import LeftSidebar from '../Components/ChatLayout/sidebars/left/LeftSidebar';
import Header from '../Components/ChatLayout/Header';
import { ReactTyped } from 'react-typed';
import Title from '../Title';
import BG from '../assets/images/bg4.png'

const ChatLayout = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { chat_id } = useParams();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className='relative flex p-2 w-full h-dvh bg-cover font-main bg-center bg-no-repeat bg-gradient-to-r from-[#030014] via-[#0d0725] to-[#030014] text-gray-400 overflow-auto space-x-2'
      style={{
        backgroundImage: `url(${BG})`,
        backgroundBlendMode: "darken"
      }}
    >
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div className={`${isDrawerOpen ? 'border border-gray-700' : ''}`}>
        <LeftSidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </div>
      <div className='w-full h-full flex flex-col relative space-y-2'>
        <div className='flex-0 border border-gray-700'>
          <Header isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        </div>
        <div className='flex-1 overflow-auto border border-gray-700'>
          {
            chat_id ?
              <Outlet />
              :
              <div className='flex items-center justify-center h-full'>
                <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-8">
                  <h1 className="text-4xl font-bold text-main mb-4">Welcome to <Title /></h1>
                  <ReactTyped
                    shuffle
                    strings={[
                      "Step into the cosmic chat—pick a topic and start exploring!",
                      "The universe is vast... Select a discussion and begin your journey!",
                      "Ready to dive into space-time mysteries? Choose a topic to chat with Proxion!",
                      "No active discussion yet. Pick a cosmology topic and let's explore together!",
                      "Your AI guide is waiting. Select a topic and uncover the secrets of the cosmos!"
                    ]}
                    typeSpeed={50}
                    backSpeed={30}
                    loop
                  />
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  )
}

export default ChatLayout