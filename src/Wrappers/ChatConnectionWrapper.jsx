import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getData } from '../Functions/localStorage';
import apiCallWithToken from '../Functions/Axios';
import { addLatestMessage, addWaitingMessage, refreshChats } from '../redux/Slice';

const token = getData('accessToken');

const ChatConnectionWrapper = (WrappedComponent) => {
    return (props) => {
        const ws = useRef(null);
        const { chat_id } = useParams();
        const dispatch = useDispatch();
        const [isConnected, setIsConnected] = useState(false);
        const [isLoading, setIsLoading] = useState(false);
        const [isMessagesLoading, setIsMessagesLoading] = useState(true);
        const [isError, setIsError] = useState(false);
        const [isTyping, setIsTyping] = useState(false);
        const [messages, setMessages] = useState([]);

        const sendPrompt = (prompt) => {
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                setIsLoading(true);
                ws.current.send(JSON.stringify(prompt));
            }
        };

        const getMessages = () => {
            let url = `chat/${chat_id}/llm-responses/`;
            let body = {};
            let method = 'get';
            let loadingState = setIsMessagesLoading;

            const onSuccess = (data) => {
                setMessages(data);
            };

            const onError = (error) => {
                console.error('Error fetching messages:', error);
            };

            apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
        };

        const addMessage = (message) => {
            if (messages.length === 0) {
                dispatch(refreshChats());
            }
            let allMessages = [...messages, message];
            setMessages(allMessages);
            setIsTyping(false);
            dispatch(addWaitingMessage(null));
        };

        const setupWebSocket = () => {
            ws.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${chat_id}?token=${token}`);

            ws.current.onopen = () => {
                setIsConnected(true);
                setIsError(false);
                console.log('WebSocket connected!');
            };

            ws.current.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'status') {
                    dispatch(addWaitingMessage(data.data));
                } else if (data.type === 'llm_response') {
                    dispatch(addLatestMessage(data.data));
                    setIsLoading(false);
                    setIsTyping(true);
                }
            };

            ws.current.onerror = (event) => {
                console.error('WebSocket error observed:', event);
                setIsConnected(false);
                setIsError(true);
                setIsLoading(false);
                setIsTyping(false);
            };

            ws.current.onclose = () => {
                console.log('WebSocket is closed now');
                setIsConnected(false);
                setIsError(true);
                setIsLoading(false);
                setIsTyping(false);
            };
        };

        const retryConnection = () => {
            if (ws.current) {
                ws.current.close();
            }
            setIsConnected(false);
            setIsError(false);
            setupWebSocket();
        };

        useEffect(() => {
            getMessages();
            setupWebSocket();
            return () => {
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.close();
                }
                setIsMessagesLoading(true);
                setIsConnected(false);
            };
        }, [chat_id]);

        return (
            <WrappedComponent
                {...props}
                isConnected={isConnected}
                isLoading={isLoading}
                isMessagesLoading={isMessagesLoading}
                isTyping={isTyping}
                isError={isError}
                sendPrompt={sendPrompt}
                messages={messages}
                addMessage={addMessage}
                retryConnection={retryConnection}
            />
        );
    };
};

export default ChatConnectionWrapper;
