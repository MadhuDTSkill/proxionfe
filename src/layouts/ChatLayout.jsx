import React, { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import LeftSidebar from '../Components/ChatLayout/sidebars/left/LeftSidebar';
import RightSidebar from '../Components/ChatLayout/sidebars/right/RightSidebar';
import Header from '../Components/ChatLayout/Header';
import { ReactTyped } from 'react-typed';
import Title from '../Title';

const ChatLayout = () => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);
  const { chat_id } = useParams();
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className='relative flex w-full bg-black h-dvh overflow-hidden text-sm text-white'
    >
      <div className={`bg-bg2 ${isDrawerOpen ? '' : ''}`}>
        <LeftSidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </div>
      <div className='w-full h-dvh bg-bg flex flex-col'>
        <div className='flex-0 '>
          <Header isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} chat_id={chat_id} />
        </div>
        <div className='flex-1 overflow-auto'>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[60%] h-72 bg-main opacity-10 blur-3xl rounded-full" />
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
      <div className={`bg-bg2 ${isDrawerOpen ? '' : ''}`}>
        <RightSidebar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      </div>
    </div>
  )
}

export default ChatLayout