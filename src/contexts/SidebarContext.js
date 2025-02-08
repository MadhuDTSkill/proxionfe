import React, { useState, createContext, useEffect } from "react";

export const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  useEffect(() => {
    // Check screen size on mount
    const handleResize = () => {
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      const isMediumOrLargeScreen = window.matchMedia("(min-width: 769px)").matches;

      if (isSmallScreen) {
        // For small screens: close both sidebars initially
        setIsLeftSidebarOpen(false);
        setIsRightSidebarOpen(false);
      } else if (isMediumOrLargeScreen) {
        // For medium and large screens: open left sidebar, keep right sidebar closed
        setIsLeftSidebarOpen(true);
        setIsRightSidebarOpen(true);
      }
    };

    // Call on initial render
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
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
