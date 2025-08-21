import React, { type ReactNode, type FC } from 'react';
import Navbar from './navbar/Navbar';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
    <Navbar/>
    {children}
    </>
  );
};

export default Layout;