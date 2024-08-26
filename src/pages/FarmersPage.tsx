import React, { useContext } from 'react';
import { Loader, Header, Button, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FarmersContext } from '../contexts/FarmersContext';
import TableComponent from '../components/TableComponent';

const FarmersPage: React.FC = () => {
  const context = useContext(FarmersContext);

  if (context === undefined) {
    throw new Error('FarmersPage must be used within a FarmersProvider');
  }

  const { farmers, loading } = context;

  if (loading) {
    return <Loader active inline="centered" content="Carregando..." />;
  }

  return (
    <Container>
      <Header as="h1">
        Agricultores
        <Button as={Link} to="/cadastrar" primary floated="right">
          Cadastrar
        </Button>
      </Header>
      
      {farmers && farmers.length > 0 && (
        <TableComponent farmers={farmers} />
      )}
    </Container>
  );
};

export default FarmersPage;