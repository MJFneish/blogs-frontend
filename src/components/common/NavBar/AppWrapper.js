import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const AppWrapper = () => {
  const showNavBarPaths = ['/', '/auth', '/blog/details', '/blog/create-edit'];

  const currentPath = window.location.pathname;
  const shouldShowNavBar = showNavBarPaths.some(path => currentPath.includes(path));

  

  return (
    <div>
      {shouldShowNavBar && <NavBar />}
    </div>
  );
};

export default AppWrapper;
