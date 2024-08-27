import React, { useContext } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { DashboardContext } from '../contexts/DashboardContext';

const MenuComponent: React.FC = () => {
  const { refreshData } = useContext(DashboardContext) || {};
  const handleClick = () => { if (refreshData) refreshData() };
  
  return (
    <Menu secondary pointing>
      <Menu.Menu>
        <Menu.Item as={Link} to="/dashboard" header onClick={handleClick}>
          Dashboard
        </Menu.Item>
        <Menu.Item as={Link} to="/farmers" header>
          Agricultores
        </Menu.Item>
      </Menu.Menu>
      <Menu.Item header position="right">
        Brain Agriculture
      </Menu.Item>
    </Menu>
  );
}

export default MenuComponent;