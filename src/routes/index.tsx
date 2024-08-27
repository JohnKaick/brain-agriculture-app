import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/DashboardPage';
import Farmers from '../pages/FarmersPage';
import MenuComponent from '../components/MenuComponent';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <MenuComponent />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farmers" element={<Farmers />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
