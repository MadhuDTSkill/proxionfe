import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import apiCallWithToken from "../../Functions/Axios";
import Buffer from "../../Components/ui/Buffer";


const NoteDetails = () => {
    const { chat_id } = useParams();
    const navigate = useNavigate();

    const [notes, setNotes] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const getNotes = () => {
        let url = `chat/${chat_id}/notes`;
        let body = {};
        let method = 'get';
        let loadingState = setIsLoading;
        const onSuccess = (data) => {
            setNotes(data);
        };
        const onError = (error) => {
            console.log(error);
        };
        apiCallWithToken(url, body, method, loadingState, onSuccess, onError);
    };

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <div className="flex-1 flex flex-col max-w-4xl mx-auto p-6 h-full">
            {/* Back Button */}
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 mb-4 font-bold transition"
                >
                    <ArrowLeft size={20} strokeWidth={3} />
                    Back
                </button>

                {/* Note Title */}
                <h1 className="text-2xl font-bold text-center">{notes.chat_name}</h1>
            </div>
            <div className="flex-1 overflow-y-auto">
                {/* Sections */}
                {
                    isLoading ?
                        <Buffer isLoading={isLoading} message="Loading Notes..." />
                        :
                        <div className="mt-4 space-y-6">
                            {
                                notes?.notes ? Object.keys(notes?.notes)?.map((section) => (
                                    <div key={section} className="p-4 rounded-lg">
                                        <h2 className="text-main font-bold mb-2">{section}</h2>
                                        <ul className="list-disc pl-6">
                                            {
                                                notes?.notes[section].map((item, index) => (
                                                    <li key={index} className="">{item}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                ))
                                    :
                                    <p className="text-gray-600">No notes available.</p>
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default NoteDetails;
