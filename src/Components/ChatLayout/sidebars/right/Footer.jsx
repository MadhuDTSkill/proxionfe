import React from 'react';
import { CiSettings } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import Title from '../../../../Title';

const Footer = () => {
    const navigate = useNavigate();

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    return (
        <div className='w-full pt-2'>
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-[15px]'><Title /> <span className='text-[9.5px] text-gray-500'>v1.0.0</span></h1>
                </div>

                <CiSettings
                    className='text-2xl text-gray-500 cursor-pointer'
                    title='Settings'
                    onClick={handleSettingsClick}
                />
            </div>
        </div>
    );
};

export default Footer;