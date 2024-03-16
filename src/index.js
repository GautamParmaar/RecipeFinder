import React from "react";
import ReactDom from 'react-dom/client';
import Header from "./components/Header";
const AppLayout = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default AppLayout;

const root = ReactDom.createRoot(document.getElementById("root"))
root.render(<AppLayout />);