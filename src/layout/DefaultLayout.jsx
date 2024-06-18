import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Sidebar from './Sidebar';

export default function DefaultLayout() {
  return (
    <>
      {/* <Sidebar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}
