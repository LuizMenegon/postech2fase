import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Button, Alert, Input } from '../styles/GlobalStyles';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { usePosts } from '../contexts/PostsContext';
import { postsService } from '../services/postsService';
import Layout from '../components/Layout';
import PostCard from '../components/PostCard';
import Loading from '../components/Loading';

const DashboardContainer = styled(Container)`
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

const WelcomeCard = styled(Card)`
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  margin-bottom: 2rem;
`;

const WelcomeTitle = styled.h2`
  margin: 0 0 0.5rem 0;
`;

const WelcomeText = styled.p`
  margin: 0;
  opacity: 0.9;
`;

const StatsCard = styled(Card)`
  margin-bottom: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
`;

const StatItem = styled.div`
  text-align: center;
  
  h3 {
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.colors.primary};
  }
  
  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const CreateButton = styled(Button)`
  background: ${props => props.theme.colors.success};
  
  &:hover {
    background: ${props => props.theme.colors.successDark};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
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

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { student, isAuthenticated } = useStudentAuth();
  const { posts, loading, error, setPosts, setLoading, setError, clearError } = usePosts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/student-login');
      return;
    }
    loadStudentPosts();
  }, [isAuthenticated, navigate]);

  // Filtrar posts do contexto global para mostrar apenas os do estudante atual
  useEffect(() => {
    if (posts && student) {
      // Filtrar posts do estudante atual dos posts globais
      const myPostsFromContext = posts.filter(post => 
        post.authorType === 'student' && 
        (post.authorId === student.ID || post.author === student.name)
      );
      
      if (searchTerm.trim()) {
        const filtered = myPostsFromContext.filter(post =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(myPostsFromContext);
      }
    } else {
      // Se não há posts do contexto, mostrar array vazio
      setFilteredPosts([]);
    }
  }, [posts, searchTerm, student]);

  const loadStudentPosts = async () => {
    try {
      setLoading(true);
      clearError();
      
      // Não carregar posts mock - usar apenas o contexto global
      
      // Comentado: versão com API real
      // const allPosts = await postsService.getAllPosts();
      // const myPosts = allPosts.filter(post => 
      //   post.authorType === 'student' && 
      //   (post.authorId === student.ID || post.author === student.name)
      // );
      // setStudentPosts(myPosts);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    navigate('/student/create-post');
  };

  const handleEdit = (postId) => {
    navigate(`/student/edit-post/${postId}`);
  };

  const handleDelete = async (postId) => {
    if (window.confirm('Tem certeza que deseja excluir este post?')) {
      try {
        await postsService.deletePost(postId);
        // A exclusão será atualizada automaticamente pelo contexto
      } catch (err) {
        setError('Erro ao excluir post');
      }
    }
  };

  const getStats = () => {
    // Filtrar apenas posts do estudante atual dos posts globais
    const myPosts = posts ? posts.filter(post => 
      post.authorType === 'student' && 
      (post.authorId === student?.ID || post.author === student?.name)
    ) : [];
    
    const total = myPosts.length;
    const thisMonth = myPosts.filter(post => {
      const postDate = new Date(post.createdAt);
      const now = new Date();
      return postDate.getMonth() === now.getMonth() && postDate.getFullYear() === now.getFullYear();
    }).length;
    
    return { total, thisMonth };
  };

  if (!isAuthenticated) {
    return null;
  }

  const stats = getStats();

  if (loading) {
    return (
      <Layout>
        <Loading text="Carregando seus posts..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <DashboardContainer>
        <WelcomeCard>
          <WelcomeTitle>Bem-vindo, {student?.name}! 🎓</WelcomeTitle>
          <WelcomeText>
            {student?.course} • Matrícula: {student?.studentId}
          </WelcomeText>
        </WelcomeCard>

        <PageHeader>
          <PageTitle>Meus Posts</PageTitle>
          <CreateButton onClick={handleCreatePost}>
            ✏️ Criar Novo Post
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
              <p>Posts Publicados</p>
            </StatItem>
            <StatItem>
              <h3>{stats.thisMonth}</h3>
              <p>Posts este Mês</p>
            </StatItem>
            <StatItem>
              <h3>{student?.course ? 1 : 0}</h3>
              <p>Curso Ativo</p>
            </StatItem>
          </StatsGrid>
        </StatsCard>
        
        <FilterContainer>
          <FilterLabel>Buscar:</FilterLabel>
          <SearchInput
            type="text"
            placeholder="Procurar por título ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </FilterContainer>
        
        {filteredPosts.length > 0 ? (
          <PostsGrid>
            {filteredPosts.map(post => (
              <PostCard
                key={post.ID || post.id}
                post={post}
                showAdminActions={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
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
                <EmptyStateTitle>Você ainda não publicou nenhum post</EmptyStateTitle>
                <p>Clique em "Criar Novo Post" para começar a compartilhar seus conhecimentos!</p>
                <CreateButton onClick={handleCreatePost} style={{ marginTop: '1rem' }}>
                  ✏️ Criar Meu Primeiro Post
                </CreateButton>
              </>
            )}
          </EmptyState>
        )}
      </DashboardContainer>
    </Layout>
  );
};

export default StudentDashboard;