import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Button, Alert, Input } from '../styles/GlobalStyles';
import { usePosts } from '../contexts/PostsContext';
import { postsService } from '../services/postsService';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const AdminContainer = styled(Container)`
  max-width: 1000px;
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: 2rem;
  margin: 0;
`;

const CreateButton = styled(Button)`
  white-space: nowrap;
`;

const StatsCard = styled(Card)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
  color: ${props => props.theme.colors.white};
  text-align: center;
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
`;

const StatItem = styled.div`
  h3 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }
  
  p {
    opacity: 0.9;
    font-size: 1rem;
  }
`;

const FilterContainer = styled.div`
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterLabel = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  white-space: nowrap;
`;

const SearchInput = styled(Input)`
  flex: 1;
  min-width: 250px;
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

const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(Card)`
  max-width: 400px;
  width: 90%;
  margin: 0;
`;

const ModalTitle = styled.h3`
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text};
`;

const ModalText = styled.p`
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const ModalActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const Admin = () => {
  const navigate = useNavigate();
  const {
    posts,
    loading,
    error,
    setPosts,
    setLoading,
    setError,
    deletePost,
    clearError
  } = usePosts();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [deleteModalPost, setDeleteModalPost] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    // Filtrar posts baseado na busca
    if (searchTerm.trim()) {
      const filtered = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    } else {
      setFilteredPosts(posts);
    }
  }, [posts, searchTerm]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      clearError();
      
      // Usando API real
      const posts = await postsService.getAllPosts();
      setPosts(posts);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (postId) => {
    navigate(`/edit/${postId}`);
  };

  const handleDeleteClick = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setDeleteModalPost(post);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteModalPost) return;
    
    try {
      setDeleting(true);
      
      // Usando API real
      await postsService.deletePost(deleteModalPost.ID || deleteModalPost.id);
      deletePost(deleteModalPost.ID || deleteModalPost.id);
      
      setDeleteModalPost(null);
      
    } catch (err) {
      setError(err.message || 'Erro ao deletar post');
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalPost(null);
  };

  const handleCreatePost = () => {
    navigate('/create');
  };

  const getStats = () => {
    const total = posts.length;
    const thisMonth = posts.filter(post => {
      const postDate = new Date(post.createdAt);
      const now = new Date();
      return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
    }).length;
    
    const authors = new Set(posts.map(post => post.author)).size;
    
    return { total, thisMonth, authors };
  };

  const stats = getStats();

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <Loading text="Carregando posts..." />
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <AdminContainer>
          <PageHeader>
            <PageTitle>Administração de Posts</PageTitle>
            <CreateButton onClick={handleCreatePost}>
              + Criar Novo Post
            </CreateButton>
          </PageHeader>
          
          {error && (
            <Alert type="danger">
              {error}
            </Alert>
          )}
          
          <StatsCard>
            <StatsGrid>
              <StatItem>
                <h3>{stats.total}</h3>
                <p>Total de Posts</p>
              </StatItem>
              <StatItem>
                <h3>{stats.thisMonth}</h3>
                <p>Posts este Mês</p>
              </StatItem>
              <StatItem>
                <h3>{stats.authors}</h3>
                <p>Autores Ativos</p>
              </StatItem>
            </StatsGrid>
          </StatsCard>
          
          <FilterContainer>
            <FilterLabel>Buscar:</FilterLabel>
            <SearchInput
              type="text"
              placeholder="Procurar por título, autor ou conteúdo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FilterContainer>
          
          {filteredPosts.length > 0 ? (
            <PostsGrid>
              {filteredPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  showAdminActions={true}
                  onEdit={handleEdit}
                  onDelete={handleDeleteClick}
                />
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
                  <p>Clique em "Criar Novo Post" para começar!</p>
                </>
              )}
            </EmptyState>
          )}
        </AdminContainer>
        
        {/* Modal de confirmação de deleção */}
        {deleteModalPost && (
          <DeleteModal>
            <ModalContent>
              <ModalTitle>Confirmar Exclusão</ModalTitle>
              <ModalText>
                Tem certeza que deseja excluir o post "{deleteModalPost.title}"? 
                Esta ação não pode ser desfeita.
              </ModalText>
              <ModalActions>
                <Button 
                  variant="outline" 
                  onClick={handleDeleteCancel}
                  disabled={deleting}
                >
                  Cancelar
                </Button>
                <Button 
                  variant="danger" 
                  onClick={handleDeleteConfirm}
                  disabled={deleting}
                >
                  {deleting ? 'Excluindo...' : 'Excluir'}
                </Button>
              </ModalActions>
            </ModalContent>
          </DeleteModal>
        )}
      </Layout>
    </ProtectedRoute>
  );
};

export default Admin;