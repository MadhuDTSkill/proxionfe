import { useEffect, useState, useRef } from 'react';
import { FaPaperPlane, FaFileImage, FaFilePdf, FaFileWord, FaFileAlt } from 'react-icons/fa';
import { IoMdSend, IoMdCloseCircle } from "react-icons/io";
import { RiAttachmentLine } from "react-icons/ri";
import { useParams } from 'react-router-dom';
import Footer from '../../ChatLayout/Footer';
import apiCallWithToken from '../../../Functions/Axios';

const Prompt = ({ setStaticPrompt, setPrompt, prompt, onSubmit, isLoading, isTyping, showFooter = true }) => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploadingFile, setIsUploadingFile] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { chat_id } = useParams();

  useEffect(() => {
    document.getElementById('input-box')?.focus();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [prompt]);

  const handleTextChange = (event) => {
    setPrompt(event.target.value);
    setStaticPrompt?.(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && ['application/pdf', 'text/plain'].includes(file.type)) {
      setUploadedFile(file);
    } else {
      console.log("Unsupported file type. Please upload a PDF or TXT file.");
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    fileInputRef.current.value = '';
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit();
      setUploadedFile(null);
    }
  };

  useEffect(() => {
    if (uploadedFile) {
      const formData = new FormData();
      formData.append('file', uploadedFile);

      apiCallWithToken(
        `chat/${chat_id}/upload-file/`,
        formData,
        'post',
        setIsUploadingFile,
        console.log,
        console.error
      );
    }
  }, [uploadedFile]);

  const renderFilePreview = () => {
    if (!uploadedFile) return null;
    const fileTypeIcons = {
      'application/pdf': <FaFilePdf className="text-main mr-2" size={24} />,
      'text/plain': <FaFileAlt className="text-main mr-2" size={24} />,
    };

    return (
      <div className="flex items-center mb-4 p-3 bg-gray-100 rounded-lg shadow-md">
        {fileTypeIcons[uploadedFile.type] || <FaFileAlt className="text-main mr-2" size={24} />}
        <span className={`text-main text-sm ${isUploadingFile ? 'animate-pulse' : ''}`}>{uploadedFile.name}</span>
        <IoMdCloseCircle className="ml-2 text-gray-500 cursor-pointer" size={22} onClick={removeFile} />
      </div>
    );
  };

  return (
    <div className="relative w-full px-4 md:px-2">
      <form onSubmit={handleSubmit}>
        {renderFilePreview()}

        <div className="relative flex items-center">
          <label htmlFor="attachment" className="absolute left-3 cursor-pointer">
            <RiAttachmentLine size={25} />
          </label>
          <input
            type="file"
            id="attachment"
            className="hidden"
            accept=".pdf, .txt"
            disabled
            onChange={handleFileChange}
            ref={fileInputRef}
          />

          <textarea
            id="input-box"
            value={prompt}
            onChange={handleTextChange}
            placeholder="Message to Proxion..."
            maxLength={8000}
            className={`pl-12 pr-12 p-3 w-full bg-transparent rounded-lg outline-none ring-2 ring-main ring-offset-2 ring-offset-bg ${isTyping ? 'animate-pulse' : ''}`}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
            ref={(el) => {
              if (el) {
                el.style.height = "auto";
                el.style.height = Math.min(el.scrollHeight, 400) + "px";
              }
            }}
            style={{
              resize: "none",
              overflowY: "auto",
              maxHeight: "200px",
            }}
          />
          <button
            type="submit"
            className="absolute right-0 rounded-full m-1"
            disabled={!prompt.trim() || isLoading || isUploadingFile || isTyping}
          >
            <IoMdSend className="bg-main p-2 rounded-lg" size={37} />
          </button>
        </div>
      </form>
      {showFooter && <Footer />}
    </div>
  );
};

export default Prompt;
