import React from 'react'
import BGVIDEO from "../../assets/videos/bg.webm";
import Header from '../../Components/RootLayout/Header';

import Welcome from '../../Components/Root/Welcome';

const Root = () => {
    return (
        <div className='flex flex-col h-full space-y-2'>
            <Header />
            <Welcome />
        </div>
    )
}

export default Root