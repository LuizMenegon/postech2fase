import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Button, Input, Textarea, FormGroup, Label, Alert } from '../styles/GlobalStyles';
import { usePosts } from '../contexts/PostsContext';
import { useAuth } from '../contexts/AuthContext';
import { postsService } from '../services/postsService';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const CreatePostContainer = styled(Container)`
  max-width: 800px;
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`;

const PostForm = styled(Card)`
  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 1rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const PreviewCard = styled(Card)`
  background-color: ${props => props.theme.colors.light};
  border: 2px dashed ${props => props.theme.colors.border};
`;

const PreviewTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const PreviewMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const PreviewContent = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  white-space: pre-wrap;
`;

const CharacterCount = styled.div`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  text-align: right;
  margin-top: 0.25rem;
`;

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addPost } = usePosts();
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('O título é obrigatório');
      return false;
    }
    
    if (formData.title.trim().length < 5) {
      setError('O título deve ter pelo menos 5 caracteres');
      return false;
    }
    
    if (!formData.content.trim()) {
      setError('O conteúdo é obrigatório');
      return false;
    }
    
    if (formData.content.trim().length < 20) {
      setError('O conteúdo deve ter pelo menos 20 caracteres');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      setError('');
      
      const postData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: user.name
      };
      
      // Usando API real
      const newPost = await postsService.createPost(postData);
      addPost(newPost);
      
      // Redirecionar para o post criado
      navigate(`/post/${newPost.ID}`);
      
    } catch (err) {
      setError(err.message || 'Erro ao criar post');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (formData.title || formData.content) {
      if (window.confirm('Tem certeza que deseja cancelar? Todas as alterações serão perdidas.')) {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ProtectedRoute>
      <Layout>
        <CreatePostContainer>
          <PageTitle>Criar Nova Postagem</PageTitle>
          
          {error && (
            <Alert type="danger">
              {error}
            </Alert>
          )}
          
          <PostForm>
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Digite o título do post..."
                  maxLength={200}
                  required
                />
                <CharacterCount>
                  {formData.title.length}/200 caracteres
                </CharacterCount>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="content">Conteúdo *</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Escreva o conteúdo do seu post..."
                  style={{ minHeight: '300px' }}
                  required
                />
                <CharacterCount>
                  {formData.content.length} caracteres
                </CharacterCount>
              </FormGroup>
              
              <ButtonGroup>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowPreview(!showPreview)}
                  disabled={!formData.title && !formData.content}
                >
                  {showPreview ? 'Ocultar Preview' : 'Visualizar Preview'}
                </Button>
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={loading || !formData.title.trim() || !formData.content.trim()}
                >
                  {loading ? 'Publicando...' : 'Publicar Post'}
                </Button>
              </ButtonGroup>
            </form>
          </PostForm>
          
          {showPreview && (formData.title || formData.content) && (
            <PreviewCard>
              <PreviewTitle>Preview da Postagem</PreviewTitle>
              
              {formData.title && (
                <h1 style={{ 
                  fontSize: '2rem', 
                  marginBottom: '1rem',
                  color: '#333'
                }}>
                  {formData.title}
                </h1>
              )}
              
              <PreviewMeta>
                <span><strong>Por {user?.name}</strong></span>
                <span>• {formatDate(new Date())}</span>
              </PreviewMeta>
              
              {formData.content && (
                <PreviewContent>
                  {formData.content}
                </PreviewContent>
              )}
              
              {!formData.title && !formData.content && (
                <p style={{ color: '#6c757d', fontStyle: 'italic' }}>
                  Digite algo nos campos acima para ver o preview...
                </p>
              )}
            </PreviewCard>
          )}
        </CreatePostContainer>
      </Layout>
    </ProtectedRoute>
  );
};

export default CreatePost;