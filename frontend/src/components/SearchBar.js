import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from '../styles/GlobalStyles';

const SearchContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchInput = styled(Input)`
  flex: 1;
  min-width: 300px;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    min-width: 100%;
  }
`;

const SearchButton = styled(Button)`
  white-space: nowrap;
`;

const ClearButton = styled(Button)`
  white-space: nowrap;
`;

const SearchResults = styled.div`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const SearchBar = ({ onSearch, searchTerm, totalResults }) => {
  const [inputValue, setInputValue] = useState(searchTerm || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <SearchContainer>
          <SearchInput
            type="text"
            placeholder="Buscar posts por título, conteúdo ou autor..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <SearchButton type="submit">
            Buscar
          </SearchButton>
          {searchTerm && (
            <ClearButton variant="outline" onClick={handleClear}>
              Limpar
            </ClearButton>
          )}
        </SearchContainer>
      </form>
      
      {searchTerm && (
        <SearchResults>
          {totalResults > 0 ? (
            `${totalResults} resultado${totalResults !== 1 ? 's' : ''} encontrado${totalResults !== 1 ? 's' : ''} para "${searchTerm}"`
          ) : (
            `Nenhum resultado encontrado para "${searchTerm}"`
          )}
        </SearchResults>
      )}
    </div>
  );
};

export default SearchBar;