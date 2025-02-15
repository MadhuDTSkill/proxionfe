import React, { useState, useEffect, useRef } from "react";
import { MdModelTraining } from "react-icons/md";

const MODES = ["Scientific", "Kids", "Casual", "Story"];
const STORAGE_KEY = "selectedMode";

const Mode = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMode, setSelectedMode] = useState("Casual");
    const modeRef = useRef(null);

    // Load mode from local storage
    useEffect(() => {
        const savedMode = localStorage.getItem(STORAGE_KEY);
        if (savedMode) setSelectedMode(savedMode);
    }, []);

    // Close the modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modeRef.current && !modeRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle mode selection
    const handleModeSelect = (mode) => {
        setSelectedMode(mode);
        localStorage.setItem(STORAGE_KEY, mode);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={modeRef}>
            <div
                className="flex items-center space-x-2 cursor-pointer p-2 text-main"
                onClick={() => setIsOpen(!isOpen)}
            >
                <MdModelTraining size={24} />
                <span className="font-bold">{selectedMode}</span>
            </div>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 border shadow-md rounded-md w-40 p-2 z-10 bg-bg">
                    {MODES.map((mode) => (
                        <div
                            key={mode}
                            className={`p-2 text-sm cursor-pointer rounded-md ${selectedMode === mode ? "bg-main text-gray-300" : "hover:bg-main/50"
                                }`}
                            onClick={() => handleModeSelect(mode)}
                        >
                            {mode}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Mode;
