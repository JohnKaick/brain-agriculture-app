import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const MenuComponent: React.FC = () => {
  return (
    <Menu secondary pointing>
      <Menu.Menu>
        <Menu.Item as={Link} to="/dashboard" header>
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