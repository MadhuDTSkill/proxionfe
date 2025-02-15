import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, Plus } from "lucide-react";
import apiCallWithToken from "../../Functions/Axios";
import Buffer from "../../Components/ui/Buffer";

const Notes = () => {

    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getNotes = () => {
        let url = 'chat/notes-list';
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
        <div className="p-4">
            {
                isLoading ?
                    <Buffer isLoading={isLoading} message="Loading Notes..." />
                    :
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <NoteCard key={note.id} note={note} />
                        ))}
                    </div>
            }
        </div>
    );
};

export default Notes


const NoteCard = ({ note }) => {
    const navigate = useNavigate();
    const maxVisibleTopics = 3;
    const hasMoreTopics = note.sections.length > maxVisibleTopics;

    return (
        <div
            className="hover:scale-[1.02] p-5 border border-gray-200 rounded-2xl shadow-md cursor-pointer hover:shadow-xl duration-300 transition-all flex items-start gap-2"
            onClick={() => navigate(`/notes/${note.id}`)}
        >
            {/* Note Icon */}
            <div className="p-2 rounded-full">
                <FileText size={24} className="text-main" />
            </div>

            {/* Note Content */}
            <div className="flex-1 space-y-6">
                <h2 className="font-semibold">{note.chat_name}</h2>
                <div className="flex flex-col gap-2">
                    <p className="text-xs text-gray-400">📅 Created: {note.created_at}</p>
                    <p className="text-xs text-gray-400">⏳ Updated: {note.updated_at}</p>
                </div>
                {/* Topics/Sections */}
                <div className="mt-2 flex flex-wrap gap-2">
                    {note.sections.slice(0, maxVisibleTopics).map((section, index) => (
                        <span key={index} className="px-2 py-1 text-xs font-semibold bg-main -200 rounded-md">
                            {section}
                        </span>
                    ))}
                    {hasMoreTopics && (
                        <span className="px-2 py-1 text-xs bg-main rounded-md flex items-center gap-1">
                            <Plus size={14} className="mt-0.5" /> {note.sections.length - maxVisibleTopics}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};
