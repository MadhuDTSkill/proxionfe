/* eslint-disable react/prop-types */
import Header from "./Header";
import Footer from "./Footer";
import ChatHistory from "./ChatHistory";
import Line from "../../../ui/Line";

const LeftSidebar = ({
    isDrawerOpen,
    toggleDrawer,
}) => {

    return (
        <>
            <div
                className={`fixed md:relative top-0 left-0 h-full bg-background2 text-foreground2 transform transition-all duration-500 z-10 md:z-0 ${isDrawerOpen ? 'w-60 lg:w-60' : 'w-0 -translate-x-full'}`}
            >
                <div
                    className={`flex flex-col space-y-1 h-full p-3 relative transition-all transform duration-500 ${isDrawerOpen ? 'opacity-100 visibility-visible translate-x-0' : 'opacity-0 visibility-hidden pointer-events-none -translate-x-[150%]'}`}
                >
                    <Header />
                    <Line />
                    <ChatHistory />
                    <Line />
                    <Footer />
                </div>

                {/* <div className={`absolute bottom-20 p-1 rounded-md bg-primary duration-500 rotate-45 ${isDrawerOpen ? '-right-[0.825rem]' : '-right-4 opacity-30 hover:opacity-100'}`}>
                    <RiMenuFold2Line
                        className={`text-lg cursor-pointer duration-500 ${isDrawerOpen ? 'rotate-[135deg]' : '-rotate-45'}`}
                        onClick={toggleDrawer}
                    />
                </div> */}
            </div>

            {isDrawerOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-0 md:hidden"
                    onClick={toggleDrawer}
                ></div>
            )}
        </>
    );
};

export default LeftSidebar;