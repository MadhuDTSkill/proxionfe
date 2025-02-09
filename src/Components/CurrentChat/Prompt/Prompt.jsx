import { useEffect, useState, useRef } from 'react';
import { FaPaperPlane, FaFileImage, FaFileAlt, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { RiAttachmentLine } from "react-icons/ri";
import { IoMdCloseCircle } from 'react-icons/io';
import Footer from '../../ChatLayout/Footer';
import apiCallWithToken from '../../../Functions/Axios';
import { useParams } from 'react-router-dom';

const Prompt = ({ setStaticPrompt, setPrompt, prompt, onSubmit, isLoading, isTyping }) => {
  const [rows, setRows] = useState(1);
  const { chat_id } = useParams()
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploadingFile, setIsUploadedingFile] = useState(null);
  const fileInputRef = useRef(null); // Create a reference for the file input

  const handleTextChange = (event) => {
    const textareaLineHeight = 24;
    const previousRows = event.target.rows;
    event.target.rows = 1; // Reset number of rows in the textarea

    const currentRows = Math.floor(event.target.scrollHeight / textareaLineHeight) - 1;
    const maxRows = 10;
    const newRows = Math.min(currentRows, maxRows);
    if (currentRows === previousRows) {
      event.target.rows = newRows || 1;
    }

    setRows(currentRows);
    setPrompt(event.target.value);
    setStaticPrompt(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file is uploaded
    if (file) {
      // Define the allowed file types
      const allowedTypes = ['application/pdf', 'text/plain'];

      // Check if the uploaded file type is allowed
      if (allowedTypes.includes(file.type)) {
        setUploadedFile(file); // Update the state with the uploaded file
      } else {
        console.log("Unsupported file type. Please upload a PDF, TXT, DOC, or DOCX file."); // Log the unsupported file type
        // Optionally, you can show a message to the user here
      }
    }
  };


  const removeFile = () => {
    setUploadedFile(null); // Remove the uploaded file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''; // Reset the file input
    }
  };

  const goForSubmit = () => {
    if (prompt?.trim() !== '' && !isLoading) {
      setRows(1);
      onSubmit();
      setUploadedFile(null); // Reset the uploaded file
    }
  };

  // Prevent form submission on Enter key
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      goForSubmit();
    }
  };

  useEffect(() => {
    const ele = document.getElementById('input-box');
    if (ele) {
      ele.focus();
    }
  }, []);

  const renderFilePreview = () => {
    if (!uploadedFile) return null;

    const fileType = uploadedFile.type;

    return (
      <div className="flex items-center mb-4 p-3 /10 rounded-lg shadow-md">
        {fileType.startsWith('image/') && <FaFileImage className="text-main mr-2" size={24} />}
        {fileType === 'application/pdf' && <FaFilePdf className="text-main mr-2" size={24} />}
        {(fileType === 'application/msword' || fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') && (
          <FaFileWord className="text-main mr-2" size={24} />
        )}
        {!fileType.startsWith('image/') && fileType !== 'application/pdf' && fileType !== 'application/msword' && fileType !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
          <FaFileAlt className="text-main mr-2" size={24} />
        )}

        <span className={`${isUploadingFile ? 'animate-pulse' : ''} text-main text-sm`}>{uploadedFile.name}</span>

        {/* Cross button to discard the uploaded file */}
        <IoMdCloseCircle
          className="ml-2 text-gray-500 cursor-pointer"
          size={22}
          onClick={removeFile}
        />
      </div>
    );
  };

  const handleFileUpload = () => {
    let formData = new FormData();
    formData.append('file', uploadedFile);
    let url = `chat/${chat_id}/upload-file/`
    let body = formData;
    let method = 'post';
    let loadingState = setIsUploadedingFile
    const onSuccess = (res) => {
      console.log(res)
    }
    const onError = (err) => {
      console.log(err)
    }
    apiCallWithToken(url, body, method, loadingState, onSuccess, onError)
  }

  useEffect(() => {
    if (uploadedFile) {
      handleFileUpload();
    }
  }, [uploadedFile])


  return (
    <div className="relative">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          goForSubmit();
        }}
      >
        {/* Render file preview or icon above the text area */}
        {renderFilePreview()}

        <div className="relative flex items-center">
          {/* Left Icon */}
          <label htmlFor="attachment" className="absolute left-3 cp">
            <RiAttachmentLine className="" size={25} />
          </label>
          <input
            type="file"
            id="attachment"
            className="hidden"
            accept=".pdf, .txt"
            disabled
            onChange={handleFileChange}
            ref={fileInputRef} // Add ref to the file input
          />

          <textarea
            id="input-box"
            value={prompt}
            onChange={handleTextChange}
            onKeyDown={handleKeyDown}
            rows={rows}
            placeholder="Message to Proxima..."
            maxLength={8000}
            className={`pl-12 pr-12 p-3 w-full max-h-52 bg-transparent outline-none border border-gray-700`}
            style={{ resize: 'none', overflow: 'hidden' }}
          />

          {/* Right Icon */}
          <button
            type="submit"
            className="absolute right-0 rounded-full p-2.5 m-1"
            disabled={prompt?.trim() === '' || isLoading || isUploadingFile || isTyping}
          >
            <FaPaperPlane className="" size={20} />
          </button>
        </div>
      </form>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Prompt;
