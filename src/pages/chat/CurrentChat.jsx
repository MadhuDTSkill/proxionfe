import React, { useEffect, useState, useRef } from "react";
import ChatConnectionWrapper from "../../Wrappers/ChatConnectionWrapper";
import Messages from "../../Components/CurrentChat/Messages/Messages";
import Prompt from "../../Components/CurrentChat/Prompt/Prompt";
import { useLocation } from "react-router-dom";
import { PiSpinnerGap } from "react-icons/pi";

const CurrentChat = ({
  isConnected,
  isLoading,
  isMessagesLoading,
  isTyping,
  sendPrompt,
  messages,
  addMessage
}) => {
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [staticPrompt, setStaticPrompt] = useState("");
  const messageContainerRef = useRef(null);



  const scrollToBottom = () => {
    const ele = document.getElementById("message-bottom");
    if (ele) {
      ele.scrollIntoView({ behavior: "smooth" });
    }
  };


  // Scroll to bottom when messages load or change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handling initial prompt from location state
  useEffect(() => {
    if (location.state && isConnected && messages.length === 0 && !isMessagesLoading) {
      onSubmit(location?.state?.prompt);
      location.state = null;
    }
  }, [location, isConnected, isMessagesLoading]);

  const onSubmit = (tempPrompt = null) => {
    setStaticPrompt(tempPrompt ? tempPrompt : prompt);
    setPrompt("");
    sendPrompt({
      prompt: {
        content: tempPrompt || prompt
      },
    });
  };

  return (
    <div className="h-full flex flex-col z-50">
      <div id="messages" className="flex-1 overflow-auto md:p-3" style={{ scrollBehavior: 'smooth' }} ref={messageContainerRef}>
        {isMessagesLoading ? (
          <div className="h-full animate-pulse flex justify-center items-center text-main">
            <PiSpinnerGap size={30} className="text-center text-main animate-spin" />
          </div>
        ) : (
          <Messages
            messages={messages}
            addMessage={addMessage}
            staticPrompt={staticPrompt}
            isLoading={isLoading}
            isTyping={isTyping}
            scrollCallBack={scrollToBottom}
          />
        )}
      </div>
      <div className="">
        <div className="flex-1 max-w-3xl mx-auto">
          {isConnected ? (
            <Prompt
              isLoading={isLoading}
              isTyping={isTyping}
              onSubmit={onSubmit}
              setPrompt={setPrompt}
              prompt={prompt}
              setStaticPrompt={setStaticPrompt}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatConnectionWrapper(CurrentChat);