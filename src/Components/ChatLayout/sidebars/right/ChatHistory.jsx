import React, { useEffect, useState } from 'react';
import ChatHistoryItem from './ChatHistoryItem';
import apiCallWithToken from '../../../../Functions/Axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PiSpinnerGapBold } from "react-icons/pi";
import Buffer from '../../../ui/Buffer'

const ChatHistory = () => {
    const { chat_id } = useParams();
    const chatsRefreshState = useSelector((state) => state.store.chatsRefresh);
    const nav = useNavigate();
    const [chats, setChats] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const getChats = () => {
        let url = 'chat/chats';
        let body = {};
        let method = 'get';
        let loadingState = setIsLoading;
        const onSuccess = (data) => {
            setChats(data);
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
        let loadingState = null;
        const onSuccess = () => {
            getChats();
        };
        const onError = (error) => {
            console.log(error);
        };
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    };

    const deleteChat = (chat_id) => {
        let url = `chat/chats/${chat_id}/`;
        let body = {};
        let method = 'delete';
        let loadingState = setIsLoading;
        const onSuccess = () => {
            setChats(prevChats => {
                const updatedChats = {};

                Object.keys(prevChats).forEach(period => {
                    const filteredChats = prevChats[period].filter(chat => chat.chat_id !== chat_id);
                    if (filteredChats.length > 0) {
                        updatedChats[period] = filteredChats;
                    }
                });

                return updatedChats;
            });
            getChats();
            nav('/');
        }
        const onError = (error) => {
            console.log(error);
        };
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    };

    useEffect(() => {
        getChats();
    }, [chat_id, chatsRefreshState]);

    // Filter chats based on search query
    const filteredChats = Object.keys(chats).reduce((acc, period) => {
        const filtered = chats[period].filter(chat =>
            chat.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filtered.length > 0) acc[period] = filtered;
        return acc;
    }, {});

    return (
        <div className='flex-1 h-full overflow-auto'>
            <div className='flex flex-col h-full overflow-auto'>
                <div className='px-3'>
                    <input
                        type='text'
                        placeholder='Search chats...'
                        className='w-full p-2 border border-gray-600 rounded bg-transparent text-white'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className='flex-1 overflow-auto px-3'>
                    {isLoading && Object.keys(filteredChats).every(key => !filteredChats[key]?.length) ? (
                        <Buffer isLoading={isLoading} message="Loading chats..." />
                    ) : (
                        Object.keys(filteredChats).map((period) => (
                            <div key={period}>
                                {filteredChats[period].length > 0 && (
                                    <>
                                        <h2 className='text-xs text-right font-semibold mt-4 mb-1'>{period}</h2>
                                        <div className='flex flex-col space-y-2'>
                                            {filteredChats[period].map((chat, index) => (
                                                <ChatHistoryItem key={index} chat={chat} onDelete={deleteChat} onCurrentFlagUpdate={updateCurrentChatFlag} />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        ))
                    )}

                    {Object.keys(filteredChats).every(key => !filteredChats[key]?.length) && (
                        <div className='h-full flex justify-center items-center'>
                            <h1 className='text-sm text-gray-400'>No chats found</h1>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
};

export default ChatHistory;
