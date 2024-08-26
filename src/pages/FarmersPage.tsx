import React, { useContext } from 'react';
import { Table, Loader, Header, Button, Container, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FarmersContext } from '../contexts/FarmersContext';

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
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nome</Table.HeaderCell>
              <Table.HeaderCell>Documento</Table.HeaderCell>
              <Table.HeaderCell>Tipo de Documento</Table.HeaderCell>
              <Table.HeaderCell>Nome da Fazenda</Table.HeaderCell>
              <Table.HeaderCell>Cidade</Table.HeaderCell>
              <Table.HeaderCell>Estado</Table.HeaderCell>
              <Table.HeaderCell>Área Total</Table.HeaderCell>
              <Table.HeaderCell>Área Cultivável</Table.HeaderCell>
              <Table.HeaderCell>Área de Vegetação</Table.HeaderCell>
              <Table.HeaderCell>Culturas</Table.HeaderCell>
              <Table.HeaderCell>Ações</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {farmers.map(farmer => (
              <Table.Row key={farmer.id}>
                <Table.Cell>{farmer.name}</Table.Cell>
                <Table.Cell>{farmer.document}</Table.Cell>
                <Table.Cell>{farmer.documentType}</Table.Cell>
                <Table.Cell>{farmer.farmName}</Table.Cell>
                <Table.Cell>{farmer.city}</Table.Cell>
                <Table.Cell>{farmer.state}</Table.Cell>
                <Table.Cell>{farmer.totalArea}</Table.Cell>
                <Table.Cell>{farmer.arableArea}</Table.Cell>
                <Table.Cell>{farmer.vegetationArea}</Table.Cell>
                <Table.Cell>{farmer.crops.join(', ')}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button icon as={Link} to={`/edit/${farmer.id}`} color="blue">
                      <Icon name="edit" />
                    </Button>
                    <Button icon as={Link} to={`/delete/${farmer.id}`} color="red">
                      <Icon name="trash" />
                    </Button>
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
};

export default FarmersPage;