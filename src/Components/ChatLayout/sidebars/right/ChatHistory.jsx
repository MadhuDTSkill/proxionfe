import React, { useEffect, useState } from 'react';
import ChatHistoryItem from './ChatHistoryItem';
import apiCallWithToken from '../../../../Functions/Axios';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { PiSpinnerGapBold } from "react-icons/pi";

const ChatHistory = () => {

    const { chat_id } = useParams()
    const chatsRefreshState = useSelector((state) => state.store.chatsRefresh);
    const nav = useNavigate()
    const [chats, setChats] = React.useState({});
    const [isLoading, setIsLoading] = useState(false)

    const getChats = () => {
        let url = 'chat/chats'
        let body = {}
        let method = 'get'
        let loadingState = setIsLoading
        const onSuccess = (data) => {
            setChats(data)
        }
        const onError = (error) => {
            console.log(error)
        }
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError)
    }

    const updateCurrentChatFlag = (chat_id) => {
        let url = `chat/chats/${chat_id}/`
        let body = {
            is_new: false
        }
        let method = 'patch'
        let loadingStatge = null
        const onSuccess = (response) => {
            getChats()
        }
        const onError = (error) => {
            console.log(error)
        }
        apiCallWithToken(url, body, method, loadingStatge, onSuccess, onError)
    }

    const deleteChat = (chat_id) => {
        let url = `chat/chats/${chat_id}/`
        let body = {}
        let method = 'delete'
        let loadingState = setIsLoading
        const onSuccess = (data) => {
            getChats()
            nav('/chats')
        }
        const onError = (error) => {
            console.log(error)
        }
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError)
    }



    useEffect(() => {
        getChats()
    }, [chat_id, chatsRefreshState])

    return (
        <div className='flex-1 overflow-auto p-3'>
            {
                isLoading && Object.keys(chats).every(key => !chats[key]?.length) ?
                    <div className='h-full flex justify-center items-center'>
                        <PiSpinnerGapBold size={20} className='text-main animate-spin' />
                    </div>
                    :
                    Object.keys(chats).map((period) => (
                        <div key={period}>
                            {
                                chats[period].length > 0 &&
                                <>
                                    <h2 className='text-xs text-right font-semibold mt-4 mb-1'>{period}</h2>
                                    <div className='flex flex-col space-y-2'>
                                        {chats[period].map((chat, index) => (
                                            <ChatHistoryItem key={index} chat={chat} onDelete={deleteChat} onCurrentFlagUpdate={updateCurrentChatFlag} />
                                        ))}
                                    </div>
                                </>
                            }
                        </div>
                    ))
            }
            {
                Object.keys(chats).every(key => !chats[key]?.length) &&
                <div className='h-full flex justify-center items-center'>
                    <h1 className='text-sm text-gray-400'>No chats found</h1>
                </div>
            }
        </div>
    );
};

export default ChatHistory;

// const fakeChats = {
//     "Today": [
//         { "title": "Monthly Roadmap Review" },
//         { "title": "Onboarding New Team Members" },
//         { "title": "Quarterly Performance Evaluation" },
//         { "title": "Backend Architecture Redesign" },
//         { "title": "Database Migration Strategy" },
//         { "title": "Marketing Campaign Launch" },
//         { "title": "Weekly Team Sync" },
//         { "title": "Bug Fixing Discussion" },
//         { "title": "Discussing Project Updates" },
//         { "title": "Client Feedback Meeting" },
//         { "title": "Brainstorming Session on New Features" }
//     ],
//     "Previous 7 Days": [
//         { "title": "Monthly Roadmap Review" },
//         { "title": "Onboarding New Team Members" },
//         { "title": "Quarterly Performance Evaluation" },
//         { "title": "Backend Architecture Redesign" },
//         { "title": "Database Migration Strategy" },
//         { "title": "Marketing Campaign Launch" },
//         { "title": "Weekly Team Sync" },
//         { "title": "Bug Fixing Discussion" },
//         { "title": "Weekly Team Sync" },
//         { "title": "Bug Fixing Discussion" },
//         { "title": "Sprint Retrospective" },
//         { "title": "Feature Deployment Plan" }
//     ],
//     "Previous 30 Days": [
//         { "title": "Monthly Roadmap Review" },
//         { "title": "Onboarding New Team Members" },
//         { "title": "Quarterly Performance Evaluation" },
//         { "title": "Backend Architecture Redesign" },
//         { "title": "Database Migration Strategy" },
//         { "title": "Marketing Campaign Launch" },
//         { "title": "Weekly Team Sync" },
//         { "title": "Bug Fixing Discussion" },
//         { "title": "Sprint Retrospective" },
//         { "title": "Feature Deployment Plan" },
//         { "title": "Weekly Team Sync" },
//         { "title": "Bug Fixing Discussion" },
//         { "title": "Sprint Retrospective" },
//         { "title": "Feature Deployment Plan" }

//     ]
// }