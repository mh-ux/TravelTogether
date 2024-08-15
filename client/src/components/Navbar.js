import React from 'react';
import styled from 'styled-components';

const NavBar = styled.nav`
  background-color: #FF6F61;
  padding: 10px;
  display: flex;
  justify-content: space-around;
`;

const NavItem = styled.a`
  color: white;
  text-decoration: none;
  font-size: 16px;
`;

const NavigationBar = () => {
  return (
    <NavBar>
      <NavItem href="/home">Home</NavItem>
      <NavItem href="/plans">Plans</NavItem>
      <NavItem href="/expenses">Expenses</NavItem>
      <NavItem href="/messages">Messages</NavItem>
    </NavBar>
  );
};

export default NavigationBar;
