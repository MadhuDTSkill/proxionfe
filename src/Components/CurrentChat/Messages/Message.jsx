import React from 'react'
import UserMessage from './UserMessage'
import ModelResponse from './ModelResponse'
import MessageMenu from './MessageMenu'

const Message = ({
  message,
  addMessage,
  scrollCallBack,
  isLoading,
  isTyping,
  waitingMessage,
  showMenu
}) => {
  return (
    <div>
      <div className='border border-gray-700 md:p-4'>
        <UserMessage message={message} />
        <ModelResponse
          isLoading={isLoading}
          isTyping={isTyping}
          message={message}
          addMessage={addMessage}
          scrollCallBack={scrollCallBack}
          waitingMessage={waitingMessage}
        />
      </div>
      <div className='h-10 max-w-3xl mx-auto py-2'>
        {
          showMenu && (
            <div className='duration-300 transition'>
              <MessageMenu message={message.response} />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Message