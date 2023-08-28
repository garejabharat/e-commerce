import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Footer";
import Header from "../components/header/Header";

const MasterLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default MasterLayout;
