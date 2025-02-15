import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HelpCircle, MessageSquareOff, Rocket, Bell, Settings2, LogOut } from "lucide-react";
import Line from "../../../ui/Line";

const Menu = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin");
    };

    return (
        <div className="flex-1 flex flex-col justify-center gap-3 bg-bg2 text-gray-300 rounded-lg w-full">
            <MenuItem to="/" label="Proxion" currentPath={location.pathname} />
            <MenuItem to="/ai-agents" label="AI Agents" currentPath={location.pathname} />
            <MenuItem to="/notes" label="Notes" currentPath={location.pathname} />
            <Line />
            <MenuItem icon={<HelpCircle size={18} />} label="Guide & FAQ" />
            <MenuItem icon={<MessageSquareOff size={18} />} label="Clear Conversations" />
            <Line />
            <MenuItem icon={<Rocket size={18} />} label="Upgrade" />
            <MenuItem icon={<Bell size={18} />} label="Notifications" />
            <MenuItem icon={<Settings2 size={18} />} label="Setting" />
            <Line />
            <MenuItem
                icon={<LogOut size={18} className="text-red-500" />}
                label="Logout"
                isLogout
                onClick={handleLogout}
            />
        </div>
    );
};

const MenuItem = ({ to, icon, label, isLogout, onClick, currentPath }) => {
    const isActive = to && currentPath === to;

    const content = (
        <div
            className={`flex items-center gap-3 p-2 cursor-pointer rounded-md transition 
                ${isActive ? "bg-main text-gray-300" : "hover:bg-main"} 
                ${isLogout ? "text-red-500" : ""}`}
            onClick={onClick}
        >
            {icon && <span className="text-base">{icon}</span>}
            <span className={`text-base ${isLogout ? "text-red-500 font-medium" : ""}`}>{label}</span>
        </div>
    );

    return to ? <Link to={to}>{content}</Link> : content;
};

export default Menu;
