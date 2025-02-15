import React, { useState } from 'react';
import { TbNotes } from "react-icons/tb";
import { MdDelete, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { CiChat1 } from "react-icons/ci";
import { useNavigate, useParams } from 'react-router-dom';
import { ReactTyped } from 'react-typed';
import DeleteModal from './DeleteModal';
import { MessageSquareText } from 'lucide-react';

const ChatHistoryItem = ({ chat, onDelete, onCurrentFlagUpdate }) => {
    const nav = useNavigate();
    const { chat_id } = useParams(); // Get the current chat ID from URL
    const [isModalOpen, setModalOpen] = useState(false); // Modal visibility state
    const [isDropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

    const handleNavigate = () => {
        return nav(`/chats/${chat.id}`);
    };

    const toggleDropdown = (e) => {
        e.stopPropagation();
        setDropdownOpen((prev) => !prev);
    };

    const confirmDelete = () => {
        onDelete(chat.id);
        setModalOpen(false);
    };

    const isActive = chat_id === chat.id;
    const isNewChat = chat.is_new;

    const updateCurrentChatFlag = () => {
        onCurrentFlagUpdate(chat.id);
    };

    return (
        <>
            <div
                className={`grid grid-cols-12 py-2 px-2.5 cursor-pointer bg-bg hover:bg-main rounded-md items-center ${isActive ? 'border-l-2 border-main' : ''}`}
                onClick={handleNavigate}
            >
                {/* Chat Icon (3 columns) */}
                <div className="col-span-2 flex justify-center">
                    <MessageSquareText className="" size={22} />
                </div>

                {/* Chat Name and Created Date (6 columns, flex-col) */}
                <div className="col-span-8 flex flex-col">
                    <span className="truncate">
                        {isNewChat ? (
                            <ReactTyped
                                strings={[chat.name || 'New Chat']}
                                typeSpeed={50}
                                loop={false}
                                showCursor={false}
                                onComplete={updateCurrentChatFlag}
                            />
                        ) : (
                            chat.name || 'New Chat'
                        )}
                    </span>
                    <span className="text-xs text-gray-400">{chat.created_at}</span>
                </div>

                {/* Dropdown Icon (3 columns) */}
                <div className="col-span-2 flex justify-center cursor-pointer" onClick={toggleDropdown}>
                    {isDropdownOpen ? <MdExpandLess size={20} /> : <MdExpandMore size={20} />}
                </div>
            </div>

            {/* Dropdown Options */}
            {isDropdownOpen && (
                <div className="mt-2 bg-bg p-2 rounded-md shadow-lg">
                    <div className="flex items-center gap-2 hover:bg-gray-700 p-2 rounded-md cursor-pointer">
                        <TbNotes className="text-lg" />
                        <span>Notes</span>
                    </div>
                    <div
                        className="flex items-center gap-2 text-red-400 hover:bg-red-600 p-2 rounded-md cursor-pointer"
                        onClick={(e) => {
                            e.stopPropagation();
                            setModalOpen(true);
                        }}
                    >
                        <MdDelete className="text-lg" />
                        <span>Delete</span>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            <DeleteModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onConfirm={confirmDelete}
            />
        </>
    );
};

export default ChatHistoryItem;
