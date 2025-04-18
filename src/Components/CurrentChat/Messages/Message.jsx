import React from 'react'
import UserMessage from './UserMessage'
import ModelResponse from './ModelResponse'
import MessageMenu from './MessageMenu'

const Message = ({
  message,
  addMessage,
  scrollCallBack,
  inView,
  isLoading,
  isTyping,
  waitingMessage,
  showMenu
}) => {
  return (
    <div>
      <div className='px-4 md:p-0'>
        <UserMessage message={message} />
        <ModelResponse
          isLoading={isLoading}
          isTyping={isTyping}
          message={message}
          addMessage={addMessage}
          inView={inView}
          scrollCallBack={scrollCallBack}
          waitingMessage={waitingMessage}
        />
      </div>
      <div className='h-10 max-w-3xl mx-auto py-2'>
        {
          showMenu && (
            <div className='flex jsustify-end px-4 md:px-1 duration-300 transition'>
              <MessageMenu message={message.response} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Message