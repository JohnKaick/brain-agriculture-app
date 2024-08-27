import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';

interface Farmer {
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

interface TableComponentProps {
  farmers: Farmer[];
  onEditFarmer: (farmer: Farmer) => void;
  onDeleteFarmer: (id: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({ farmers, onEditFarmer, onDeleteFarmer }) => {
  const headers = [
    'Nome',
    'Documento',
    'Tipo de Documento',
    'Nome da Fazenda',
    'Cidade',
    'Estado',
    'Área Total',
    'Área Cultivável',
    'Área de Vegetação',
    'Culturas',
    'Ações'
  ];

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          {headers.map((header, index) => (
            <Table.HeaderCell key={index}>{header}</Table.HeaderCell>
          ))}
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
                <Button icon color="blue" onClick={() => onEditFarmer(farmer)}>
                  <Icon name="edit" />
                </Button>
                <Button icon color="red" onClick={() => onDeleteFarmer(farmer.id)}>
                  <Icon name="trash" />
                </Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default TableComponent;
