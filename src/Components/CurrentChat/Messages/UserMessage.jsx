import React from 'react'
import Markdown from 'react-markdown'

const UserMessage = ({
  message
}) => {
  return (
    <div className='max-w-3xl mx-auto'>
      <h1 className='font-semibold text-sm my-2'>You</h1>
      <Markdown className={'text-sm text-body'}>
        {message.prompt}
      </Markdown>
    </div>
  )
}

export default UserMessage