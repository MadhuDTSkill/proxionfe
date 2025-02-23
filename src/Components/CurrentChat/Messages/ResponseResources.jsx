import React, { useState } from "react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { ChevronDown, ChevronUp } from "lucide-react";

const ResponseResources = ({ message }) => {
    const [showThoughts, setShowThoughts] = useState(false);
    const [showTools, setShowTools] = useState(false);

    const toggleThoughts = () => {
        setShowThoughts(!showThoughts);
        if (!showThoughts) setShowTools(false);
    };

    const toggleTools = () => {
        setShowTools(!showTools);
        if (!showTools) setShowThoughts(false);
    };

    return (
        <div className="flex flex-wrap gap-2 space-x-2 max-w-3xl text-sm mx-auto">
            {/* Thoughts Section */}
            {!message.isLoading && message.is_thoughted && (
                <div className="">
                    <button
                        className={`flex items-center bg-bg2/60 p-1.5 rounded-lg w-28 text-sm font-semibold transition ${showThoughts ? "text-white" : "text-gray-400 hover:opacity-80"
                            }`}
                        onClick={toggleThoughts}
                        disabled={showTools}
                    >
                        {showThoughts ? <ChevronUp size={16} strokeWidth={3} /> : <ChevronDown size={16} strokeWidth={3} />}
                        <span className="ml-3">Thoughts</span>
                    </button>

                    {showThoughts && (
                        <motion.div
                            className="mt-2 text-sm text-gray-500 w-full llm-response bg-bg2/60 rounded-lg p-5 md:px-10"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            <Markdown>
                                {message?.thinked_thoughts.replace("\n", "\n\n")}
                            </Markdown>
                        </motion.div>
                    )}
                </div>
            )}

            {/* Tool Response Section */}
            {!message.isLoading && message.tool_responses && Object.keys(message.tool_responses).length > 0 && (
                <div className="">
                    <button
                        className={`flex items-center bg-bg2/60 p-1.5 rounded-lg w-36 text-sm font-semibold transition ${showTools ? "text-white" : "text-gray-400 hover:opacity-80"
                            }`}
                        onClick={toggleTools}
                        disabled={showThoughts}
                    >
                        {showTools ? <ChevronUp size={16} strokeWidth={3} /> : <ChevronDown size={16} strokeWidth={3} />}
                        <span className="ml-3">Tool Responses</span>
                    </button>

                    {showTools && (
                        <motion.div
                            className="mt-2 text-sm text-gray-500 w-full llm-response bg-bg2/60 rounded-lg p-5 md:px-10"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                        >
                            {
                                Object.keys(message.tool_responses).map((toolName, index) => (
                                    <div key={index}>
                                        <strong>{toolName}:</strong>
                                        <Markdown>{message.tool_responses[toolName]}</Markdown>
                                    </div>
                                ))
                            }
                        </motion.div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ResponseResources;
