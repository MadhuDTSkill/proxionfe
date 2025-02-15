import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lightbulb, Sparkles, Telescope } from "lucide-react";
import Buffer from "../../Components/ui/Buffer";
import apiCallWithToken from "../../Functions/Axios";
import Prompt from "../../Components/CurrentChat/Prompt/Prompt";

const MODES = ["Scientific", "Kids", "Casual", "Story"];

const NewChat = () => {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const createChat = () => {
    if (!prompt.trim()) return;

    let url = "chat/chats/";
    let body = { name: prompt };
    let method = "post";
    let loadingStage = setIsLoading;

    const onSuccess = (response) => {
      const chat_id = response.id;
      nav(`/chats/${chat_id}`, { state: { prompt } });
    };

    const onError = (error) => {
      console.error(error);
    };

    apiCallWithToken(url, body, method, loadingStage, onSuccess, onError);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-6 w-full">
      <h1 className="text-3xl font-bold mb-2">Welcome to <span className="text-main">Proxion</span></h1>
      <p className="text-gray-400 text-sm mb-6">Your AI companion for exploring the universe.</p>

      <div className="flex flex-col items-center justify-center w-full max-w-2xl">
        <Prompt isLoading={isLoading} setPrompt={setPrompt} prompt={prompt} onSubmit={createChat} isTyping={isLoading} showFooter={false} />
      </div>
      <Buffer isLoading={isLoading} message="Creating Chat..." />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-28 w-full items-baseline max-w-3xl">
        <div className="flex flex-col items-center text-center p-4">
          <Telescope className="text-green-400 mb-2" size={20} />
          <h3 className="font-semibold text-gray-300">Focused on Cosmology</h3>
          <p className="text-gray-400 text-sm">Proxion specializes in space sciences, astrophysics, and cosmology.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <Sparkles className="text-green-400 mb-2" size={20} />
          <h3 className="font-semibold">Smart Responses</h3>
          <p className="text-gray-400 text-sm">It evaluates, refines, analyzes, and thinks before answering any question.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <Lightbulb className="text-green-400 mb-2" size={22} />
          <h3 className="font-semibold">Modes for Everyone</h3>
          <p className="text-gray-400 text-sm">Choose from {MODES.join(", ")} modes to tailor your experience.</p>
        </div>
      </div>
    </div>
  );
};

export default NewChat;
