import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import Title from "../../../Title";
import Markdown from "react-markdown";
import WordTypewriter from "../../ui/Typing";
import { setNotesBusy } from "../../../redux/Slice";
import ResponseResources from "./ResponseResources";

const ModelResponse = ({ message, addMessage, scrollCallBack, isLoading, isTyping, waitingMessage }) => {
  const dispatch = useDispatch();
  const [elapsedTime, setElapsedTime] = useState(0);
  const responseTime = message?.time_taken ? `${Math.round(message.time_taken + 1)} seconds` : "N/A";



  useEffect(() => {
    let timer;
    if (isLoading) {
      setElapsedTime(0);
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const reflectAnimation = {
    hidden: { opacity: 0.4 },
    visible: (i) => ({
      opacity: [0.4, 1, 0.4],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "loop",
        delay: i * 0.08,
      },
    }),
  };

  return (
    <div className="bg-bg2/30 rounded-lg">
      <h1 className="font-semibold max-w-3xl text-sm mx-auto my-2 flex justify-between items-center">
        Proxion
      </h1>

      {/* Response Resources Component */}
      <ResponseResources message={message} />

      {/* Response Section */}
      <div className="hover:bg-opacity-10 bg-opacity-5 p-2">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <motion.div className="text-lg font-semibold text-white flex flex-wrap space-x-1">
              {waitingMessage?.content?.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={reflectAnimation}
                  initial="hidden"
                  animate="visible"
                  className="inline-block text-[11px] zero-2"
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          ) : isTyping ? (
            <WordTypewriter
              text={message.response}
              typeSpeed={5}
              animate
              onBegin={() => {
                dispatch(setNotesBusy(true));
              }}
              onChunk={() => {
                scrollCallBack();
              }}
              onComplete={() => {
                addMessage && addMessage(message);
                dispatch(setNotesBusy(false));
              }}
            />
          ) : (
            <div className="llm-response">
              <Markdown>{message.response}</Markdown>
            </div>
          )}

          <span className="text-xs text-gray-400 self-end">
            Response Time: {isLoading ? `${elapsedTime} seconds` : responseTime}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ModelResponse;
