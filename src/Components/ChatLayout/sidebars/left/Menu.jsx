import React from "react";
import { FaRobot, FaCogs, FaQuestionCircle, FaCommentSlash, FaRocket, FaBell, FaCog, FaSignOutAlt } from "react-icons/fa";
import Line from "../../../ui/Line";
import LOGO from "../../../../assets/images/proxion.png";


const Menu = () => {
    // Dummy function to simulate click events
    const handleClick = (label) => {
        console.log(`${label} clicked!`);
        alert(`${label} clicked!`);
    };

    return (
        <div className="flex-1 flex flex-col justify-center gap-3 bg-bg2 text-gray-300 rounded-lg w-full">
            <MenuItem icon={''} label="Proxion" onClick={handleClick} />
            <MenuItem icon={''} label="AI Agents" onClick={handleClick} />
            <Line />
            <MenuItem icon={<FaQuestionCircle size={16} />} label="Guide & FAQ" onClick={handleClick} />
            <MenuItem icon={<FaCommentSlash size={16} />} label="Clear Conversations" onClick={handleClick} />
            <Line />
            <MenuItem icon={<FaRocket size={16} />} label="Upgrade" onClick={handleClick} />
            <MenuItem icon={<FaBell size={16} />} label="Notifications" onClick={handleClick} />
            <MenuItem icon={<FaCog size={16} />} label="Setting" onClick={handleClick} />
            <Line />
            <MenuItem icon={<FaSignOutAlt size={16} className="text-red-500" />} label="Logout" isLogout onClick={handleClick} />
        </div>
    );
};

const MenuItem = ({ icon, label, isLogout, onClick }) => {
    return (
        <div
            className={`flex items-center gap-3 p-2 cursor-pointer rounded-md transition ${isLogout ? "text-red-500 " : "hover:bg-main"
                }`}
            onClick={() => onClick(label)} // Call the function on click
        >
            <span className="text-base">{icon}</span>
            <span className={`text-base ${isLogout ? "text-red-500 font-medium" : ""}`}>{label}</span>
        </div>
    );
};

export default Menu;
