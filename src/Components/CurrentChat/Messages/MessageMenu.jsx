import React, { useState } from 'react';
import { MdSaveAlt, MdContentCopy, MdRefresh, MdPlayArrow, MdStop } from "react-icons/md";

// Function to strip Markdown syntax using regular expressions
const stripMarkdown = (markdown) => {
  return markdown
    // Remove headers
    .replace(/[#]+/g, '')
    // Remove emphasis (italic, bold)
    .replace(/[*_]+/g, '')
    // Remove links
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove code blocks
    .replace(/`{1,3}.*?`{1,3}/g, '')
    // Remove other special characters used in markdown (optional, add/remove based on your use case)
    .replace(/[\\<>*_~[\]]+/g, '')
    .trim();
};

const MessageMenu = ({ message }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [copyIcon, setCopyIcon] = useState(<MdContentCopy size={17} className='hover:text-gray-300 hover:p-1 rounded' />);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Function to handle speech synthesis (text-to-speech)
  const startSpeaking = () => {
    const cleanMessage = stripMarkdown(message); // Clean the message by stripping Markdown
    const utterance = new SpeechSynthesisUtterance(cleanMessage);
    speechSynthesis.speak(utterance);
    setIsSpeaking(true);

    utterance.onend = () => {
      setIsSpeaking(false); // Reset state when speech ends
    };
  };

  // Function to stop speaking
  const stopSpeaking = () => {
    speechSynthesis.cancel(); // Cancel the speech
    setIsSpeaking(false);
  };

  // Menu items array
  const menuItems = [
    {
      icon: copyIcon,
      title: 'Copy',
      action: () => {
        navigator.clipboard.writeText(message)
          .then(() => {
            // Change the icon to 'Copied' state
            setCopyIcon(<span className='text-main'>Copied!</span>);
            // Reset the icon after 2 seconds
            setTimeout(() => setCopyIcon(<MdContentCopy size={17} className=' hover:text-gray-300 hover:p-1 rounded' />), 3000);
          })
          .catch((err) => console.error('Failed to copy: ', err));
      }
    },
    {
      icon: <MdRefresh size={20} className=' hover:text-gray-300 hover:p-1 rounded' />,
      title: 'Refresh',
      action: () => {
        // Implement refresh logic here
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
        a.download = 'message.md'; // Filename
        a.click();
        URL.revokeObjectURL(url); // Clean up URL.createObjectURL
      }
    },
    {
      icon: isSpeaking ? <MdStop size={20} className=' hover:text-gray-300 hover:p-1 rounded' /> : <MdPlayArrow size={20} className=' hover:text-gray-300 hover:p-1 rounded' />,
      title: isSpeaking ? 'Stop Speaking' : 'Play',
      action: isSpeaking ? stopSpeaking : startSpeaking // Toggle between starting and stopping speech
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
