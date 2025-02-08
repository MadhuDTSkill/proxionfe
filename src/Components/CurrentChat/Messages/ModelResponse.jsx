import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Title from '../../../Title';
import Markdown from 'react-markdown';

const loadingMessages = ['Loading...', 'Searching...', 'Thinking...'];

const ModelResponse = ({
  message,
  isLoading,
  isTyping,
  waitingMessage = 'Loading...',
}) => {
  const [currentMessage, setCurrentMessage] = useState(waitingMessage);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentMessage(prev => {
          const nextIndex = (loadingMessages.indexOf(prev) + 1) % loadingMessages.length;
          return waitingMessage;
        });
      }, 2000); // Change text every 2 seconds

      return () => clearInterval(interval);
    }
  }, [isLoading]);

  // Wave animation for each letter
  const waveAnimation = {
    hidden: { y: 0 },
    visible: i => ({
      y: [0, -2, 0], // Moves up and down like a wave
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: 'reverse',
        delay: i * 0.1, // Creates a wave effect across letters
      },
    }),
  };

  return (
    <div className=''>
      <h1 className='font-semibold max-w-3xl text-sm mx-auto my-2'><Title /></h1>
      <div className='hover:bg-opacity-10 bg-opacity-5 p-2'>
        <div className='max-w-3xl mx-auto'>
          {isLoading ? (
            <motion.div className="text-lg font-semibold text-main flex space-x-1">
              {currentMessage.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={waveAnimation}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-sm text-body animate-pulse"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          ) : (
            <div className={isTyping ? 'animate-pulse' : ''}>
              <Markdown className="text-sm text-body">
                {message.response}
              </Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModelResponse;
