import React, { useEffect, useState } from 'react';
import ChatHistoryItem from './ChatHistoryItem';
import apiCallWithToken from '../../../../Functions/Axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PiSpinnerGapBold } from "react-icons/pi";

const ChatHistory = () => {
    const { chat_id } = useParams();
    const chatsRefreshState = useSelector((state) => state.store.chatsRefresh);
    const nav = useNavigate();
    const [chats, setChats] = useState(fakeChats); // Initializing with fakeChats
    const [isLoading, setIsLoading] = useState(false);

    const getChats = () => {
        let url = 'chat/chats';
        let body = {};
        let method = 'get';
        let loadingState = setIsLoading;

        const onSuccess = (data) => {
            setChats(data); // Expecting data as an array of objects
        };
        const onError = (error) => {
            console.log(error);
        };
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    };

    const updateCurrentChatFlag = (chat_id) => {
        let url = `chat/chats/${chat_id}/`;
        let body = { is_new: false };
        let method = 'patch';

        const onSuccess = () => {
            getChats();
        };
        const onError = (error) => {
            console.log(error);
        };
        apiCallWithToken(url, body, method, null, onSuccess, onError);
    };

    const deleteChat = (chat_id) => {
        let url = `chat/chats/${chat_id}/`;
        let body = {};
        let method = 'delete';
        let loadingState = setIsLoading;

        const onSuccess = () => {
            getChats();
            nav('/chats');
        };
        const onError = (error) => {
            console.log(error);
        };
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    };

    useEffect(() => {
        getChats();
    }, [chat_id, chatsRefreshState]);

    return (
        <div className='flex-1 overflow-y-auto overflow-x-hidden p-3'>
            {isLoading ? (
                <div className='h-full flex justify-center items-center'>
                    <PiSpinnerGapBold size={20} className='text-main animate-spin' />
                </div>
            ) : chats.length > 0 ? (
                <div className='flex flex-col space-y-2'>
                    {chats.map((chat) => (
                        <ChatHistoryItem key={chat.id} chat={chat} onDelete={deleteChat} onCurrentFlagUpdate={updateCurrentChatFlag} />
                    ))}
                </div>
            ) : (
                <div className='h-full flex justify-center items-center'>
                    <h1 className='text-sm '>No chats found</h1>
                </div>
            )}
        </div>
    );
};

export default ChatHistory;


const fakeChats = [
    { id: 1, name: "Monthly Roadmap Review", created_at: "Today at 10:30 AM" },
    { id: 2, name: "Onboarding New Team Members", created_at: "Today at 12:15 PM" },
    { id: 3, name: "Quarterly Performance Evaluation", created_at: "Today at 2:00 PM" },
    { id: 4, name: "Backend Architecture Redesign", created_at: "Today at 4:45 PM" },
    { id: 5, name: "Database Migration Strategy", created_at: "Today at 6:30 PM" },
    { id: 6, name: "Marketing Campaign Launch", created_at: "Yesterday at 9:00 AM" },
    { id: 7, name: "Weekly Team Sync", created_at: "Yesterday at 11:00 AM" },
    { id: 8, name: "Bug Fixing Discussion", created_at: "Yesterday at 3:45 PM" },
    { id: 9, name: "Discussing Project Updates", created_at: "3 days ago" },
    { id: 10, name: "Client Feedback Meeting", created_at: "5 days ago" },
    { id: 11, name: "Brainstorming Session on New Features", created_at: "6 days ago" },
    { id: 12, name: "Sprint Retrospective", created_at: "7 days ago" },
    { id: 13, name: "Feature Deployment Plan", created_at: "10 days ago" },
    { id: 14, name: "Security Audit Review", created_at: "12 days ago" },
    { id: 15, name: "Product Roadmap Discussion", created_at: "15 days ago" }
];
