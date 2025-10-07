import React from 'react';
import styled from 'styled-components';
import { Container } from '../styles/GlobalStyles';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.dark};
  color: ${props => props.theme.colors.light};
  padding: 2rem 0 1rem;
  margin-top: auto;
`;

const FooterContent = styled(Container)`
  text-align: center;
`;

const FooterSection = styled.div`
  margin-bottom: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.colors.white};
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const Copyright = styled.div`
  border-top: 1px solid ${props => props.theme.colors.secondary};
  padding-top: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>We Learn</FooterTitle>
          <FooterText>
            Plataforma educacional para professores da Postech - 2ª Fase
          </FooterText>
          <FooterText>
            Compartilhe conhecimento e conecte-se com outros educadores
          </FooterText>
        </FooterSection>
        
        <Copyright>
          © {currentYear} Plataforma We Learn. Todos os direitos reservados.
        </Copyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;