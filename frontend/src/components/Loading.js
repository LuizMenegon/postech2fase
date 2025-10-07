import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../styles/GlobalStyles';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  gap: 1rem;
`;

const LoadingText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 1rem;
`;

const Loading = ({ text = 'Carregando...', size = '40px' }) => {
  return (
    <LoadingContainer>
      <LoadingSpinner size={size} />
      <LoadingText>{text}</LoadingText>
    </LoadingContainer>
  );
};

export default Loading;