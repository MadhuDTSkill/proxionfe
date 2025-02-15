import React, { useContext } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import LeftSidebar from '../Components/ChatLayout/sidebars/left/LeftSidebar';
import RightSidebar from '../Components/ChatLayout/sidebars/right/RightSidebar';
import Header from '../Components/ChatLayout/Header';
import { ReactTyped } from 'react-typed';
import Title from '../Title';
import { SidebarContext } from '../contexts/SidebarContext';

const ChatLayout = () => {

  const { isLeftSidebarOpen, isRightSidebarOpen, toggleLeftSidebar, toggleRightSidebar } = useContext(SidebarContext)
  const { chat_id } = useParams();

  return (
    <div className='relative flex w-full bg-black h-dvh overflow-hidden text-sm text-gray-300'
    >
      <div className={`bg-bg2 ${isLeftSidebarOpen ? '' : ''}`}>
        <LeftSidebar isDrawerOpen={isLeftSidebarOpen} toggleDrawer={toggleLeftSidebar} />
      </div>
      <div className='w-full h-dvh bg-bg flex flex-col overflow-auto'>
        <div className='flex-0'>
          <Header chat_id={chat_id} />
        </div>
        <div className='flex-1 overflow-auto'>
          <Outlet />
        </div>
      </div>
      <div className={`bg-bg2 ${isRightSidebarOpen ? '' : ''}`}>
        <RightSidebar isDrawerOpen={isRightSidebarOpen} toggleDrawer={toggleRightSidebar} />
      </div>
    </div>
  )
}

export default ChatLayout