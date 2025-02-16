import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import Title from "../../../Title";
import Markdown from "react-markdown";
import WordTypewriter from "../../ui/Typing";
import { setNotesBusy } from "../../../redux/Slice";
import { ChevronDown, ChevronUp } from "lucide-react";

const ModelResponse = ({
  message,
  addMessage,
  scrollCallBack,
  isLoading,
  isTyping,
  waitingMessage,
}) => {
  const dispatch = useDispatch();
  const [showThoughts, setShowThoughts] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const responseTime = message?.time_taken ? `${message.time_taken} seconds` : "N/A";

  // Start the live timer when isLoading is true
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
        <Title />
        <span className="text-xs text-gray-400">
          Response Time: {isLoading ? `${elapsedTime} seconds` : responseTime}
        </span>
      </h1>

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
              typeSpeed={20}
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
        </div>

        {/* Thoughts Section */}
        {!isLoading && message.is_thoughted && (
          <div className="mt-4 px-3 flex flex-col items-end max-w-3xl text-sm mx-auto my-2">
            <button
              className="flex items-center text-sm font-semibold text-white hover:opacity-80 transition"
              onClick={() => setShowThoughts(!showThoughts)}
            >
              {showThoughts ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              <span className="ml-1">Thoughts</span>
            </button>

            {showThoughts && (
              <motion.div
                className="mt-2 text-sm text-gray-300 w-full"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <pre><Markdown>{message?.thinked_thoughts}</Markdown></pre>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ModelResponse;
