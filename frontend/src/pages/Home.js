import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Container, Alert } from '../styles/GlobalStyles';
import { usePosts } from '../contexts/PostsContext';
import { postsService } from '../services/postsService';
import Layout from '../components/Layout';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const HomeContainer = styled(Container)`
  max-width: 1000px;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 300;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const PostsGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const EmptyStateTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const Home = () => {
  const {
    posts,
    filteredPosts,
    loading,
    error,
    searchTerm,
    setPosts,
    setLoading,
    setError,
    setSearchTerm,
    clearError
  } = usePosts();

  // Não precisa mais de useEffect para carregar posts iniciais
  // O PostsContext já faz isso automaticamente

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  if (loading) {
    return (
      <Layout>
        <Loading text="Carregando posts..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <HomeContainer>
        <PageTitle>Blog dos Professores</PageTitle>
        
        {error && (
          <Alert type="danger">
            {error}
          </Alert>
        )}
        
        <SearchBar
          onSearch={handleSearch}
          searchTerm={searchTerm}
          totalResults={filteredPosts.length}
        />
        
        {filteredPosts.length > 0 ? (
          <PostsGrid>
            {filteredPosts.map(post => (
              <PostCard key={post.ID || post.id} post={post} />
            ))}
          </PostsGrid>
        ) : (
          <EmptyState>
            {searchTerm ? (
              <>
                <EmptyStateTitle>Nenhum post encontrado</EmptyStateTitle>
                <p>Tente ajustar sua busca ou explorar outros termos.</p>
              </>
            ) : (
              <>
                <EmptyStateTitle>Ainda não há posts publicados</EmptyStateTitle>
                <p>Seja o primeiro a compartilhar conhecimento!</p>
              </>
            )}
          </EmptyState>
        )}
      </HomeContainer>
    </Layout>
  );
};

export default Home;