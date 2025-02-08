import React, { useRef } from "react";
import Card from "../../Components/ui/Card";
import Buffer from "../ui/Buffer";

const Topics = ({ selectedCategory, currentTopics }) => {

  return (
    <div className="p-4 h-full flex flex-col items-center overflow-auto border border-gray-700 w-[80%]">
      <div className="flex flex-col justify-center items-center h-full w-full p-5">
        <div className="p-10 flex space-x-12 overflow-x-auto scroll-smooth w-full">
          {currentTopics.map((topic, index) => (
            <Card key={index} extraClassName="flex-shrink-0 hover:scale-[1.2]">
              <div
                key={index}
                className={`cursor-pointer flex justify-center items-center transition-all w-80 p-10`}
              >
                <div className="flex flex-col space-y-5 justify-center items-center">
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
