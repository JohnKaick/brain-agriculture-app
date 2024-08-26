import React from 'react';
import AppRoutes from './routes'
import { FarmersProvider } from './contexts/FarmersContext';
import { DashboardProvider } from './contexts/DashboardContext';

const App: React.FC = () => {
  return (
    <DashboardProvider>
      <FarmersProvider>
        <AppRoutes />
      </FarmersProvider>
    </DashboardProvider>
  )
}

export default App
