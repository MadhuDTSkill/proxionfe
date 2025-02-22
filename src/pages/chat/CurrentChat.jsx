import React, { useEffect, useState, useRef } from "react";
import ChatConnectionWrapper from "../../Wrappers/ChatConnectionWrapper";
import Button from "../../Components/ui/Button";
import Messages from "../../Components/CurrentChat/Messages/Messages";
import Prompt from "../../Components/CurrentChat/Prompt/Prompt";
import { useLocation } from "react-router-dom";
import { PiSpinnerGap } from "react-icons/pi";
import { getData } from "../../Functions/localStorage";

const CurrentChat = ({
  isConnected,
  isLoading,
  isMessagesLoading,
  isTyping,
  isError,
  sendPrompt,
  messages,
  addMessage,
  retryConnection
}) => {
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [staticPrompt, setStaticPrompt] = useState("");
  const messageContainerRef = useRef(null);
  const [allowAutoScroll, setAllowAutoScroll] = useState(true);

  const scrollToBottom = (override_auto_scroll = false) => {
    if (allowAutoScroll || override_auto_scroll) {
      const ele = document.getElementById("message-bottom");
      if (ele) {
        ele.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleUserScroll = () => {
    if (messageContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;

      // If user scrolls up, disable auto-scroll
      if (scrollTop + clientHeight < scrollHeight - 10) {
        setAllowAutoScroll(false);
      } else {
        setAllowAutoScroll(true); // Re-enable auto-scroll if user scrolls to bottom
      }
    }
  };

  // Attach scroll event listener
  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.addEventListener("scroll", handleUserScroll);
    }
    return () => {
      if (messageContainer) {
        messageContainer.removeEventListener("scroll", handleUserScroll);
      }
    };
  }, []);

  // Scroll to bottom when messages update (only if auto-scroll is enabled)
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
        content: tempPrompt || prompt,
        mode: getData("selectedMode") || "Casual",
      },
    });
  };

  return (
    <div className="h-full flex flex-col z-50">
      <div
        id="messages"
        className="flex-1 overflow-auto md:p-3"
        style={{ scrollBehavior: "smooth" }}
        ref={messageContainerRef}
      >
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
            isError && (
              <div className="flex flex-col items-center justify-center p-4 text-red-700 rounded-lg">
                <p className="text-lg font-semibold">Chat Disconnected</p>
                <p className="my-1">Your connection was lost. Please try reconnecting.</p>
                <Button
                  onClick={retryConnection}
                  extraClassName="mt-3 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
                >
                  Reconnect
                </Button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatConnectionWrapper(CurrentChat);
