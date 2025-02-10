import React from 'react';
import Badge from '../../Components/ui/Badge';
import { WiStars } from 'react-icons/wi';
import { FaBookOpen, FaRobot, FaLock, FaPencilAlt } from 'react-icons/fa';
import { PiPlus } from 'react-icons/pi'
import Card from '../ui/Card';
import Button from '../ui/Button';

const Welcome = () => {
    return (
        <div className="p-4 h-full flex flex-col items-center overflow-auto border border-gray-700">

            {/* Title and Encouragement */}
            <div className='mt-36'>

            </div>
            <Badge>
                <WiStars className='text-main text-3xl mr-2' />
                <h1 className='text-main'>Explore the Cosmos with AI</h1>
            </Badge>

            <h1 className='text-5xl font-bold text-main text-center mt-4'>
                Proxion: Your AI Guide to Cosmology
            </h1>
            <h2 className='mt-3 text-center text-gray-300 max-w-3xl'>
                Dive deep into the <strong>Mysteries of the Universe</strong> with AI-powered cosmology chats.
                From black holes to dark energy, Proxion helps you <strong>Think, Explore, and Understand.</strong>
            </h2>
            <div className='mt-8 flex flex-col items-center space-y-4'>
                <Button href={'/new-chat'} extraClassName='w-52'>
                    <div className='flex items-center space-x-2'>
                        <PiPlus size={20} />
                        <span className='text-sm'>New Chat</span>
                    </div>
                </Button>
            </div>

            {/* Features in Card Format */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">

                {/* Card 1: AI-Generated Notes */}
                <Card>
                    <div className="flex flex-col items-center text-center p-4">
                        <FaPencilAlt className="text-3xl mb-3" />
                        <h3 className="font-semibold text-main">AI-Generated Notes</h3>
                        <p className="text-sm mt-2">
                            Every conversation is automatically <strong>Saved as structured notes</strong>,
                            so you never lose track of insights from your cosmology discussions.
                        </p>
                    </div>
                </Card>

                {/* Card 2: Specialized for Cosmology */}
                <Card>
                    <div className="flex flex-col items-center text-center p-4">
                        <FaRobot className="text-3xl mb-3" />
                        <h3 className="font-semibold text-main">Cosmology-Focused AI</h3>
                        <p className="text-sm mt-2">
                            Unlike general AI chatbots, <strong>Proxion is designed exclusively</strong> for
                            deep cosmological discussions—exploring theories, space-time, and beyond.
                        </p>
                    </div>
                </Card>

                {/* Card 3: Smarter Responses */}
                <Card>
                    <div className="flex flex-col items-center text-center p-4">
                        <FaBookOpen className="text-3xl mb-3" />
                        <h3 className="font-semibold text-main">Smarter Responses</h3>
                        <p className="text-sm mt-2">
                            Proxion <strong>uses Wikipedia, ArXiv, and DuckDuckGo</strong> to
                            fetch up-to-date knowledge, making AI responses more <strong>Accurate and Scientific</strong>.
                        </p>
                    </div>
                </Card>


                {/* Card 4: Secure & Private */}
                <Card>
                    <div className="flex flex-col items-center text-center p-4">
                        <FaLock className="text-3xl mb-3" />
                        <h3 className="font-semibold text-main">Secure & Private</h3>
                        <p className="text-sm mt-2">
                            Your chats and notes are <strong>Securely Stored</strong> and accessible only to you.
                            Privacy is a priority at every level of Proxion.
                        </p>
                    </div>
                </Card>

            </div>
        </div>
    );
}

export default Welcome;
