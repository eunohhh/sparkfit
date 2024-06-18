import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DefaultLayout from '../layout/DefaultLayout';
import GatheringList from '../page/GatheringList';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/gathering" element={<GatheringList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
