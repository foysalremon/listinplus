import React, { type ReactNode, type FC } from 'react';
import Navbar from './navbar/Navbar';
import { Toaster } from 'react-hot-toast';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000
        }}
      />
    </>
  );
};

export default Layout;