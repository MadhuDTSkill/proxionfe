import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/images/proxion.png";
import Button from "../ui/Button";
import Title from "../../Title";

const NavLinks = [
    { name: "New Chat", link: "/new-chat" },
    { name: "Chats", link: "/chats" },
    { name: "Notes", link: "/notes" },
    { name: "Settings", link: "/settings" },
];

const Header = () => {
    return (
        <div className="flex items-center justify-between py-3 px-6 border border-gray-700">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center">
                <img src={LOGO} alt="Proxion Logo" className="h-10 w-auto" />
                <Title />
            </Link>

            {/* Center: Navigation Links */}
            <nav className="flex space-x-6 rounded-full shadow-sm shadow-gray-500 p-2 px-5 bg-white bg-opacity-5">
                {NavLinks.map((item) => (
                    <Link
                        key={item.name}
                        to={item.link}
                        className="text-white text-sm hover:text-gray-400 duration-300 transition"
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            {/* Right: Login Button */}
            <Button
                href={''}
            >
                <h1 className="text-sm">Login</h1>
            </Button>
        </div>
    );
};

export default Header;
