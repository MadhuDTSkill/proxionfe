/* eslint-disable react/prop-types */
import Header from "./Header";
import ChatHistory from "./ChatHistory";
import { RiMenuFold2Line } from "react-icons/ri";

const RightSidebar = ({ isDrawerOpen, toggleDrawer }) => {
    return (
        <>
            {/* Sidebar Container */}
            <div
                className={`fixed md:relative top-0 right-0 h-full bg-background2 text-foreground2 transform transition-all duration-500 z-10 md:z-0 
                    ${isDrawerOpen ? 'w-80 lg:w-64 translate-x-0' : 'w-0 translate-x-full'}`}
            >
                <div
                    className={`bg-bg2 flex flex-col space-y-1 h-full relative transition-all transform duration-500 
                        ${isDrawerOpen ? 'opacity-100 visibility-visible translate-x-0' : 'opacity-0 visibility-hidden pointer-events-none translate-x-full'}`}
                >
                    <Header />
                    <ChatHistory />
                </div>

                {/* Sidebar Toggle Button */}
                <div
                    className={`absolute bottom-20 p-1 rounded-md bg-main duration-500 rotate-45 ${isDrawerOpen ? '-left-[0.825rem]' : '-left-4 opacity-30 hover:opacity-100'}`}>
                    <RiMenuFold2Line
                        className={`text-lg cursor-pointer duration-500 ${isDrawerOpen ? 'rotate-[135deg]' : 'rotate-[135deg]'}`}
                        onClick={toggleDrawer}
                    />
                </div>
            </div>

            {/* Overlay for mobile screens */}
            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
                    onClick={toggleDrawer}
                ></div>
            )}
        </>
    );
};

export default RightSidebar;
