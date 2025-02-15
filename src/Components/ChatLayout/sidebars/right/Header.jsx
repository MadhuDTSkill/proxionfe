import React from 'react'
import Button from '../../../ui/Button'
import { PiPlus } from 'react-icons/pi'
import { Plus } from 'lucide-react'

const Header = () => {
    return (
        <div className='flex flex-col justify-center items-center p-3'>

            <Button href={'/'} extraClassName='w-full'>
                <div className='flex items-center space-x-2'>
                    <Plus size={20} strokeWidth={3} />
                    <span className='text-sm'>New Chat</span>
                </div>
            </Button>
        </div>
    )
}

export default Header