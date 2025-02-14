/* eslint-disable react/prop-types */
import Header from "./Header";
import Footer from "./Footer";
import Line from "../../../ui/Line";
import Menu from "./Menu";
import { RiMenuFold2Line } from "react-icons/ri";

const LeftSidebar = ({
    isDrawerOpen,
    toggleDrawer,
}) => {

    return (
        <>
            <div
                className={`fixed md:relative top-0 left-0 h-full transform transition-all duration-500 z-10 md:z-0 ${isDrawerOpen ? 'w-64 lg:w-64' : 'w-0 -translate-x-full'}`}
            >
                <div
                    className={`flex flex-col space-y-1 h-full p-5 relative transition-all transform duration-500 ${isDrawerOpen ? 'opacity-100 visibility-visible translate-x-0' : 'opacity-0 visibility-hidden pointer-events-none -translate-x-full'}`}
                >
                    <Header />
                    <Line />
                    <Menu />
                    <Footer />
                </div>

                <div className={`absolute bottom-20 p-1 rounded-md bg-main duration-500 rotate-45 ${isDrawerOpen ? '-right-[0.825rem]' : '-right-4 opacity-30 hover:opacity-100'}`}>
                    <RiMenuFold2Line
                        className={`text-lg cursor-pointer duration-500 ${isDrawerOpen ? 'rotate-[135deg]' : '-rotate-45'}`}
                        onClick={toggleDrawer}
                    />
                </div>
            </div>

            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
                    onClick={toggleDrawer}
                ></div>
            )}
        </>

    );
};

export default LeftSidebar;