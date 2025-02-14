import React from "react";
import SidebarProvider from "./SidebarContext";

const Contexts = ({ children }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

export default Contexts;
