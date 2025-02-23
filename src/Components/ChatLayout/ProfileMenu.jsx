import React, { useState, useRef, useEffect } from 'react';
import { FiSettings, FiLogOut } from 'react-icons/fi';
import Card from '../ui/Card';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);


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

    localStorage.clear();

    window.location.href = '/signin';
  };

  const handleSettingsRedirect = () => {

    window.location.href = '/settings';
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Icon (Trigger) */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-gray-300 bg-main cursor-pointer"
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
                onClick={handleSettingsRedirect}
              >
                <FiSettings className="mr-2" />
                <span>Settings</span>
              </li>

              {/* Logout Option */}
              <li
                className="flex items-center p-2 rounded-lg hover:bg-main cursor-pointer"
                onClick={handleLogout}
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
