import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface DashboardData {
  totalFarmers: number;
  totalArea: number;
  farmersByState: { state: string; count: string }[];
  cropsDistribution: { crop: string; count: string }[];
  landUsage: {
    arableArea: number;
    vegetationArea: number;
  };
}

interface DashboardContextProps {
  dashboardData: DashboardData | null;
  loading: boolean;
}

const DashboardContext = createContext<DashboardContextProps | undefined>(undefined);

export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:3000/farmers/dashboard')
      .then(response => {
        setDashboardData(response.data);
      })
      .catch(error => {
        console.error('Error fetching dashboard data', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <DashboardContext.Provider value={{ dashboardData, loading }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};
