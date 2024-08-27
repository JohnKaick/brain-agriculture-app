import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface Farmer {
  id: string;
  document: string;
  documentType: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalArea: string;
  arableArea: string;
  vegetationArea: string;
  crops: string[];
}

interface FarmersContextProps {
  farmers: Farmer[] | null;
  loading: boolean;
  fetchFarmers: () => void;
}

const FarmersContext = createContext<FarmersContextProps | undefined>(undefined);

const FarmersProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [farmers, setFarmers] = useState<Farmer[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchFarmers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/farmers');
      setFarmers(response.data);
    } catch (error) {
      console.error('Erro ao buscar os dados dos agricultores', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  return (
    <FarmersContext.Provider value={{ farmers, loading, fetchFarmers }}>
      {children}
    </FarmersContext.Provider>
  );
};

export { FarmersContext, FarmersProvider };
