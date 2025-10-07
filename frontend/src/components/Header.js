import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Container, Button } from '../styles/GlobalStyles';

const HeaderContainer = styled.header`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  padding: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.white};
  text-decoration: none;

  &:hover {
    color: ${props => props.theme.colors.light};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    width: 100%;
    justify-content: center;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.white};
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: ${props => props.theme.borderRadius};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserName = styled.span`
  font-weight: 500;
`;

const LogoutButton = styled(Button)`
  background-color: transparent;
  border: 1px solid ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.white};
  font-size: 0.875rem;
  padding: 0.375rem 0.75rem;

  &:hover {
    background-color: ${props => props.theme.colors.white};
    color: ${props => props.theme.colors.primary};
  }
`;

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">We Learn</Logo>
        
        <Nav>
          <NavLink to="/">Início</NavLink>
          
          {isAuthenticated ? (
            <>
              <NavLink to="/create">Criar Post</NavLink>
              <NavLink to="/admin">Administração</NavLink>
              <UserInfo>
                <UserName>Olá, {user?.name}</UserName>
                <LogoutButton onClick={handleLogout}>
                  Sair
                </LogoutButton>
              </UserInfo>
            </>
          ) : (
            <NavLink to="/login">Login</NavLink>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;