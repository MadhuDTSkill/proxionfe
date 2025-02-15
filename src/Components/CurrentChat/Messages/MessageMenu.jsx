import React, { useState } from 'react';
import { MdSaveAlt, MdContentCopy, MdRefresh, MdPlayArrow, MdStop } from "react-icons/md";

const stripMarkdown = (markdown) => {
  return markdown
    .replace(/[#]+/g, '')
    .replace(/[*_]+/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^>\s+/gm, '')
    .replace(/`{1,3}.*?`{1,3}/g, '')
    .replace(/[\\<>*_~[\]]+/g, '')
    .trim();
};

const MessageMenu = ({ message }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copyIcon, setCopyIcon] = useState(<MdContentCopy size={17} className='hover:text-gray-300 hover:p-1 rounded' />);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const startSpeaking = () => {
    const cleanMessage = stripMarkdown(message);
    const utterance = new SpeechSynthesisUtterance(cleanMessage);
    speechSynthesis.speak(utterance);
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false);
    };
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const menuItems = [
    {
      icon: copyIcon,
      title: 'Copy',
      action: () => {
        navigator.clipboard.writeText(message)
          .then(() => {

            setCopyIcon(<span className='text-main'>Copied!</span>);

            setTimeout(() => setCopyIcon(<MdContentCopy size={17} className=' hover:text-gray-300 hover:p-1 rounded' />), 3000);
          })
          .catch((err) => console.error('Failed to copy: ', err));
      }
    },
    {
      icon: <MdRefresh size={20} className=' hover:text-gray-300 hover:p-1 rounded' />,
      title: 'Refresh',
      action: () => {

        console.log('Refresh response');
      }
    },
    {
      icon: <MdSaveAlt size={20} className=' hover:text-gray-300 hover:p-1 rounded' />,
      title: 'Save as Markdown',
      action: () => {
        const blob = new Blob([message], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'message.md';
        a.click();
        URL.revokeObjectURL(url);
      }
    },
    {
      icon: isSpeaking ? <MdStop size={20} className=' hover:text-gray-300 hover:p-1 rounded' /> : <MdPlayArrow size={20} className=' hover:text-gray-300 hover:p-1 rounded' />,
      title: isSpeaking ? 'Stop Speaking' : 'Play',
      action: isSpeaking ? stopSpeaking : startSpeaking
    }
  ];

  return (
    <div className='flex space-x-4'>
      {menuItems.map((item, index) => (
        <div
          key={index}
          className='flex items-center cursor-pointer relative'
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={item.action}
        >
          {item.icon}
          {hoveredIndex === index && (
            <span className='absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-gray-300 text-xs rounded p-1 mt-2'>
              {item.title}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessageMenu;
