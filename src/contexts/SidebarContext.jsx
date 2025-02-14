import React, { useState, createContext, useEffect } from "react";

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      const isMediumOrLargeScreen = window.matchMedia("(min-width: 769px)").matches;

      if (isSmallScreen) {
        setIsLeftSidebarOpen(false);
        setIsRightSidebarOpen(false);
      } else if (isMediumOrLargeScreen) {
        setIsLeftSidebarOpen(true);
        setIsRightSidebarOpen(true);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleLeftSidebar = () => {
    setIsLeftSidebarOpen(!isLeftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setIsRightSidebarOpen(!isRightSidebarOpen);
  };

  return (
    <SidebarContext.Provider
      value={{
        isLeftSidebarOpen,
        isRightSidebarOpen,
        toggleLeftSidebar,
        toggleRightSidebar,
        setIsLeftSidebarOpen,
        setIsRightSidebarOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;
