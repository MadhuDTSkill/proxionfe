import React from 'react';
import Message from './Message';
import { useSelector } from 'react-redux';
import { useInView } from 'react-intersection-observer';
import { IoMdArrowDown } from 'react-icons/io';
import Card from '../../ui/Card';

const Messages = ({
  messages,
  staticPrompt,
  isLoading,
  isTyping,
  scrollCallBack,
  waitingMessage
}) => {

  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 1,
  });

  const latestMessageState = useSelector(
    (state) => state.store.latestMessage
  );

  return (
    <div className='relative'>
      <div className='flex flex-col gap-2 w-full'>
        {messages.map((message) => (
          // <Card key={message.id}>
          <Message key={message.id} message={message} showMenu />
          // </Card>
        ))}
        {isTyping && (
          <Message
            message={latestMessageState}
            isTyping={isTyping}
          />
        )}
        {isLoading && (
          <Message
            key='loading-message'
            isLoading={isLoading}
            waitingMessage={waitingMessage}
            message={{
              id: 'loading',
              prompt: staticPrompt,
            }}
          />
        )}
      </div>
      {/* Scroll to bottom button */}
      <div
        onClick={scrollCallBack}
        className={`${!inView ? 'opacity-100' : 'opacity-0'
          } sticky z-20 inset-x-0 bottom-0 flex justify-center transition-opacity duration-300 ease-in-out cp`}
      >
        <IoMdArrowDown className='p-1.5 rounded-full' size={30} />
      </div>
      <span ref={ref} id='message-bottom'></span>
    </div>
  );
};

export default Messages;