import React from "react";

const Header = () => {
    return (
        <div className="flex flex-col justify-center items-center pb-2">
            <div className="bg-bg rounded-xl w-full flex justify-between items-center p-2">
                {/* Dummy User Profile */}
                <div className="flex items-center gap-3">
                    <img
                        src="https://i.pravatar.cc/40?img=3"
                        alt="User Profile"
                        className="w-10 h-10 rounded-full border-2 border-gray-500"
                    />
                    <div className="flex flex-col space-y-1">
                        <span className="text-gray-300 font-semibold">Madhu Sunil</span>
                        <span className=" text-xs">Free account</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
