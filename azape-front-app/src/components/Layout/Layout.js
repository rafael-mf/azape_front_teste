import React from 'react';
import Sidebar from '../common/Sidebar/Sidebar';
import Topbar from '../common/Topbar/Topbar';
import Footer from '../common/Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content-area">
        <Topbar />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;