import React, { useState, useRef, useEffect } from "react";
import Badge from "../ui/Badge";
import Buffer from "../ui/Buffer";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import apiCallWithToken from "../../Functions/Axios";

const NotesViewModal = ({
    chat_id
}) => {
    const [showNotes, setShowNotes] = useState(false);
    const [notes, setNotes] = useState("");
    const [isLoading, setIsLoading] = useState(false)

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

    const notesData = {
        "Key Facts About Earth": [
            "Earth is the third planet from the Sun in our solar system.",
            "It is composed of iron, oxygen, silicon, and magnesium, among other elements.",
            "The atmosphere is made up of 78% nitrogen, 21% oxygen, and 1% other gases.",
            "Earth's formation is believed to have occurred around 4.5 billion years ago from the gravitational collapse of a giant cloud of gas and dust.",
            "The planet's surface is 71% water, with the majority being oceans, lakes, and rivers."
        ],
        "Earth Formation Overview": [
            "The Earth formed around 4.54 billion years ago during the Hadean Eon.",
            "The Nebular Hypothesis suggests the solar system formed from a giant cloud of gas and dust called the solar nebula.",
            "The early Earth formed through accretion, where small particles of rock and metal stuck together.",
            "The giant impact hypothesis suggests a massive object called Theia collided with the early Earth, causing the formation of the Moon.",
            "The Earth's surface cooled, the crust solidified, and the atmosphere formed over time."
        ]
    };

    const getChatNotes = () => {
        let url = `chat/${chat_id}/notes`
        let body = {}
        let method = 'get'
        let loadingState = setIsLoading
        const onSuccess = (data) => {
            setNotes(data?.notes)
        }
        const onError = (error) => {
            console.log(error)
        }
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError)
    }

    // Close notes modal when clicking outside
    useEffect(() => {
        getChatNotes()
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
        <div className="flex justify-center items-center">
            <Badge>
                {isNotesBusyState ? (
                    <motion.div className="text-sm font-semibold text-main flex space-x-1">
                        {"Generating Notes..."?.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                custom={i}
                                variants={reflectAnimation}
                                initial="hidden"
                                animate="visible"
                                className="inline-block text-sm text-main" // Ensuring no background styling
                            >
                                {char}
                            </motion.span>
                        ))}
                    </motion.div>
                ) : (
                    <div
                        onClick={() => {
                            setShowNotes(true)
                            getChatNotes()
                        }}
                        className="cursor-pointer text-sm text-main"
                    >
                        View Notes
                    </div>
                )}
            </Badge>

            {showNotes && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div
                        ref={modalRef}
                        className="bg-main p-6 rounded-lg shadow-lg w-[800px] max-h-[90vh] overflow-y-auto relative"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-center">Notes</h2>
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                            onClick={() => setShowNotes(false)}
                        >
                            ✖
                        </button>
                        {
                            isLoading ?
                                <Buffer isLoading={isLoading} />
                                :
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
                        }
                    </div>
                </div>
            )}
        </div>
    );
};

export default NotesViewModal;
