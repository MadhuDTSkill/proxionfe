import React, { useState, useRef, useEffect } from "react";
import Badge from "../ui/Badge";
import Buffer from "../ui/Buffer";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { IoDocumentTextOutline, IoClose } from "react-icons/io5";
import apiCallWithToken from "../../Functions/Axios";

const NotesViewModal = ({ chat_id }) => {
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const modalRef = useRef(null);
    const isNotesBusyState = useSelector((state) => state.store.isNotesBusy);

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

    const getChatNotes = () => {
        let url = `chat/${chat_id}/notes`;
        let body = {};
        let method = "get";
        let loadingState = setIsLoading;
        const onSuccess = (data) => {
            setNotes(data?.notes);
        };
        const onError = (error) => {
            console.log(error);
        };
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    };

    useEffect(() => {
        getChatNotes();
        const handleClickOutsideModal = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowNotes(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutsideModal);
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideModal);
        };
    }, []);

    return (
        <div className="flex justify-center items-center overflow-hidden">
            {isNotesBusyState ? (
                <div className="flex items-center space-x-2 cursor-pointer p-2 text-main">
                    <IoDocumentTextOutline
                        size={25}
                        className="cursor-pointer text-main"
                        title="Auto Notes"
                        onClick={() => {
                            setShowNotes(true);
                            getChatNotes();
                        }}
                    />
                    <motion.div className="text-[9px] font-semibold text-main flex space-x-1">
                        {"Updatings... "?.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={reflectAnimation}
                                initial="hidden"
                                animate="visible"
                                className="inline-block text-[10px] text-main"
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            ) : (
                <div className="flex items-center space-x-2 cursor-pointer p-2 text-main">
                    <IoDocumentTextOutline
                        size={25}
                        className="cursor-pointer text-main"
                        title="Auto Notes"
                        onClick={() => {
                            setShowNotes(true);
                            getChatNotes();
                        }}
                    />
                    <span className="font-bold">Notes</span>

                </div>
            )}
            {showNotes && (
                <div className="fixed inset-0 bg-black bg-opacity-50 overflow-hidden flex items-center justify-center z-50">
                    <div
                        ref={modalRef}
                        className="bg-bg p-6 rounded-lg shadow-lg w-[800px] max-h-[90vh] soverflow-y-auto relative"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center">Notes</h2>
                        <button
                            className="absolute top-2 right-2 text-white"
                            onClick={() => setShowNotes(false)}
                        >
                            <IoClose size={22} />
                        </button>
                        {isLoading ? (
                            <Buffer isLoading={isLoading} />
                        ) : (
                            <div className="overflow-y-auto max-h-[80vh]">
                                {Object.entries(notes).map(([category, points]) => (
                                    <div key={category} className="mb-4">
                                        <h3 className="text-lg font-medium my-2">{category}</h3>
                                        <ul className="list-disc ml-10 text-sm">
                                            {points.map((point, index) => (
                                                <li key={index}>{point}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesViewModal;
