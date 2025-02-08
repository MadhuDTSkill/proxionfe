// Modal.js
import React from 'react';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null; // Don't render if not open

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-lg font-bold mb-4">Delete Confirmation</h2>
                <p>Are you sure you want to delete this chat?</p>
                <div className="mt-4 flex justify-end">
                    <button className="mr-2 px-4 py-2 text-white bg-gray-400 rounded" onClick={onClose}>Cancel</button>
                    <button className="px-4 py-2  text-white rounded" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;