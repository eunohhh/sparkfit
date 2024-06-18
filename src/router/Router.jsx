import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import GatheringList from '../page/GatheringList';
import NavermapScriptComponent from '../pages/MainPage/NavermapScriptComponent';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<NavermapScriptComponent />} />
          <Route path="/gathering" element={<GatheringList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
