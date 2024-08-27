import React, { useContext, useState } from 'react';
import { Loader, Header, Button, Container } from 'semantic-ui-react';
import { Farmer, FarmersContext } from '../contexts/FarmersContext';
import TableComponent from '../components/TableComponent';
import FormFarmer from './FormFarmerPage';
import axios from 'axios';

const FarmersPage: React.FC = () => {
  const context = useContext(FarmersContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFarmer, setSelectedFarmer] = useState<Farmer | Record<string, any>>({});

  if (context === undefined) {
    throw new Error('FarmersPage must be used within a FarmersProvider');
  }

  const { farmers, fetchFarmers, loading } = context;

  const onDeleteFarmer = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/farmers/${id}`);
      fetchFarmers();
    } catch (err) {
      console.log('Erro ao excluir agricultor.');
    }
  };

  const openModal = (farmer: Farmer | Record<string, any>) => {
    setSelectedFarmer(farmer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedFarmer({});
    setIsModalOpen(false);
  };

  if (loading) {
    return <Loader active inline="centered" content="Carregando..." />;
  }

  return (
    <Container>
      <Header as="h1">
        Agricultores
        <Button primary floated="right" onClick={() => openModal({})}>
          Cadastrar
        </Button>
      </Header>
      
      {farmers && farmers.length > 0 && (
        <TableComponent farmers={farmers} onEditFarmer={(farmer: Farmer) => openModal(farmer)} onDeleteFarmer={onDeleteFarmer}/>
      )}

      <FormFarmer isOpen={isModalOpen} onClose={closeModal} farmer={selectedFarmer} fetchFarmers={fetchFarmers}/>
    </Container>
  );
};

export default FarmersPage;