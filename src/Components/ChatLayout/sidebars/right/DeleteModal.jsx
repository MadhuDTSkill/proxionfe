
import React from 'react';
import Card from '../../../ui/Card';
import Button from '../../../ui/Button';

const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
            <Card fill>
                <div className="p-6 rounded shadow-lg">
                    <h2 className="text-main text-sm font-semibold mb-4">Delete Confirmation</h2>
                    <p className='text-sm'>Are you sure you want to delete this chat?</p>
                    <div className="mt-4 flex justify-end text-sm">
                        <button className="mr-2 px-4 py-2 border bg-gray-800 rounded" onClick={onClose}>Cancel</button>
                        <Button extraClassName="px-4 py-2  text-gray-300 rounded" onClick={onConfirm}>Delete</Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default DeleteModal;