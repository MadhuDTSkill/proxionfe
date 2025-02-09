import React, { useState } from "react";
import Card from "../../Components/ui/Card";
import Buffer from "../ui/Buffer";
import apiCallWithToken from "../../Functions/Axios";
import { useNavigate } from "react-router-dom";
import CoverImages from './CoverImages';

const Topics = ({ selectedCategory, currentTopics }) => {

  const nav = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const createTopicChat = (topic) => {
    let url = 'chat/chats/'
    let body = {}
    let method = 'post'
    let loadingStatge = setIsLoading
    const onSuccess = (response) => {
      const chat_id = response.id
      const prompt = `Let's starts with topic : ${topic.name}`
      nav(`/chats/${chat_id}`, { state: { prompt: prompt } })
    }
    const onError = (error) => {
      console.log(error)
    }
    apiCallWithToken(url, body, method, loadingStatge, onSuccess, onError)
  }


  return (
    <div className="p-4 h-full flex flex-col items-center overflow-auto border border-gray-700 lg:w-[80%] md:w-[70%]">
      <Buffer isLoading={isLoading} message={"Creating Chat..."} />
      <div className="flex flex-col justify-center items-center h-full w-full p-5">
        <div className="p-10 flex space-x-12 overflow-x-auto scroll-smooth w-full">
          {currentTopics.map((topic, index) => (
            <Card key={index} onClick={() => createTopicChat(topic)} extraClassName="flex-shrink-0 hover:scale-[1.2]">
              <div
                key={index}
                className={`cursor-pointer flex justify-center items-center transition-all w-80 p-10`}
              >
                <div className="flex flex-col space-y-5 justify-center items-center">
                  <img src={CoverImages[topic.name]} alt="Cover Img" className="w-36 h-auto" />
                  <h1>{topic.name}</h1>
                  <span className="text-sm text-center">{topic.description}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        <h1 className="text-right font-semibold text-xl mb-4">{selectedCategory}</h1>
      </div>
    </div>
  );
};

export default Topics;
