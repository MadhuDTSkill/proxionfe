import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div
      className="flex flex-col p-1 h-dvh bg-bg overflow-auto relative text-sm"
    >
      <div className="flex-1 w-full flex flex-col h-full overflow-auto relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RootLayout;
