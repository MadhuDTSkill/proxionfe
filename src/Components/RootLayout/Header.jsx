import React from "react";
import { Link } from "react-router-dom";
import LOGO from "../../assets/images/proxion.png";
import Button from "../ui/Button";
import Title from "../../Title";
import { getData } from "../../Functions/localStorage";
import Badge from "../ui/Badge";

const NavLinks = [
    { name: "New Chat", link: "/" },
    { name: "Notes", link: "/notes" },
];

const user = JSON.parse(getData("user") || "{}");

const Header = () => {
    return (
        <div className="flex items-center justify-between py-3 px-6 ">
            {/* Left: Logo */}
            <Link to="/" className="flex items-center">
                <img src={LOGO} alt="Proxion Logo" className="h-10 w-auto" />
                <Title />
            </Link>

            {/* Right: User Info or Sign In Button */}
            {user.first_name && user.last_name ? (
                <Badge>
                    <div className="text-main text-sm font-semibold">{`${user.first_name} ${user.last_name}`}</div>

                </Badge>
            ) : (
                <Button href="/signin">
                    <h1 className="text-sm">Sign In</h1>
                </Button>
            )}
        </div>
    );
};

export default Header;
