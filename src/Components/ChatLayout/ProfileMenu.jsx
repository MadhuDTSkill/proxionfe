import React, { useState, useRef, useEffect } from 'react';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import Card from '../ui/Card';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle clicking outside of the menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Clear all local storage
    localStorage.clear();
    // Redirect to the sign-in page
    window.location.href = '/signin'; // Use your actual login route here
  };

  const handleSettingsRedirect = () => {
    // Redirect to settings page
    window.location.href = '/settings'; // Use your actual settings route here
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Icon (Trigger) */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white bg-main cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        M
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 z-10">
          <Card fill>
            <ul className="">
              {/* Settings Option */}
              <li
                className="flex items-center p-2 rounded-lg hover:bg-main cursor-pointer"
                onClick={handleSettingsRedirect} // Redirect to settings
              >
                <FiSettings className="mr-2" />
                <span>Settings</span>
              </li>

              {/* Logout Option */}
              <li
                className="flex items-center p-2 rounded-lg hover:bg-main cursor-pointer"
                onClick={handleLogout} // Logout and redirect
              >
                <FiLogOut className="mr-2" />
                <span>Logout</span>
              </li>
            </ul>
          </Card>
        </div>

      )}
    </div>
  );
};

export default ProfileMenu;
