import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Button, Input, Textarea, FormGroup, Label, Alert } from '../styles/GlobalStyles';
import { usePosts } from '../contexts/PostsContext';
import { useAuth } from '../contexts/AuthContext';
import { postsService } from '../services/postsService';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import Loading from '../components/Loading';

const EditPostContainer = styled(Container)`
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

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { posts, updatePost } = usePosts();
  
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [originalData, setOriginalData] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Primeiro, tentar encontrar o post nos posts do contexto
      const contextPost = posts.find(post => post.ID === parseInt(id) || post.id === parseInt(id));
      
      if (contextPost) {
        const postData = {
          title: contextPost.title,
          content: contextPost.content
        };
        setFormData(postData);
        setOriginalData(postData);
        return;
      }
      
      // Se não encontrar no contexto, tentar API real
      try {
        const post = await postsService.getPostById(id);
        const postData = {
          title: post.title,
          content: post.content
        };
        setFormData(postData);
        setOriginalData(postData);
        return;
      } catch (apiError) {
        console.log('API Error, falling back to mock data:', apiError);
      }
      
      // Fallback para dados mock se API falhar
      const mockPosts = {
        1: {
          id: 1,
          title: 'Introdução ao React',
          content: `React é uma biblioteca JavaScript para construir interfaces de usuário. Desenvolvida pelo Facebook, ela revolucionou a forma como criamos aplicações web modernas.

## Por que usar React?

React oferece várias vantagens:

- **Componentização**: Permite criar componentes reutilizáveis
- **Virtual DOM**: Otimiza a performance das aplicações
- **Unidirectional Data Flow**: Facilita o debug e manutenção
- **Grande ecossistema**: Muitas bibliotecas e ferramentas disponíveis`,
          author: 'Prof. João Silva',
          createdAt: new Date('2024-01-15'),
        },
        2: {
          id: 2,
          title: 'Fundamentos de JavaScript',
          content: `JavaScript é a linguagem de programação da web. Neste artigo, abordaremos os conceitos fundamentais que todo desenvolvedor deve conhecer.

## Variáveis e Tipos de Dados

JavaScript possui tipos primitivos e objetos:

\`\`\`javascript
let numero = 42;
let texto = "Olá, mundo!";
let booleano = true;
let objeto = { nome: "João", idade: 30 };
\`\`\``,
          author: 'Prof. Maria Santos',
          createdAt: new Date('2024-01-10'),
        },
        3: {
          id: 3,
          title: 'Desenvolvimento Backend com Node.js',
          content: `Node.js permite executar JavaScript no servidor, abrindo um mundo de possibilidades para desenvolvimento full-stack.

## O que é Node.js?

Node.js é um runtime JavaScript construído no motor V8 do Chrome. Ele permite executar JavaScript fora do navegador, especialmente no servidor.`,
          author: 'Prof. Pedro Oliveira',
          createdAt: new Date('2024-01-05'),
        }
      };
      
      const post = mockPosts[id];
      if (!post) {
        throw new Error('Post não encontrado');
      }
      
      const postData = {
        title: post.title,
        content: post.content
      };
      
      setFormData(postData);
      setOriginalData(postData);
      
      // Código para API real (comentado até backend estar pronto)
      // const post = await postsService.getPostById(id);
      // const postData = {
      //   title: post.title,
      //   content: post.content
      // };
      // setFormData(postData);
      // setOriginalData(postData);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  const hasChanges = () => {
    return formData.title !== originalData.title || 
           formData.content !== originalData.content;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    if (!hasChanges()) {
      navigate(`/post/${id}`);
      return;
    }
    
    try {
      setSaving(true);
      setError('');
      
      const postData = {
        id: parseInt(id),
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: user.name,
        createdAt: new Date() // Será atualizado pelo backend
      };
      
      // Usando API real
      const updatedPost = await postsService.updatePost(id, {
        title: formData.title.trim(),
        content: formData.content.trim()
      });
      updatePost(updatedPost);
      
      // Redirecionar para o post atualizado
      navigate(`/post/${id}`);
      
    } catch (err) {
      setError(err.message || 'Erro ao atualizar post');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (hasChanges()) {
      if (window.confirm('Tem certeza que deseja cancelar? Todas as alterações serão perdidas.')) {
        navigate(`/post/${id}`);
      }
    } else {
      navigate(`/post/${id}`);
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

  if (loading) {
    return (
      <ProtectedRoute>
        <Layout>
          <Loading text="Carregando post..." />
        </Layout>
      </ProtectedRoute>
    );
  }

  if (error && !formData.title) {
    return (
      <ProtectedRoute>
        <Layout>
          <EditPostContainer>
            <Alert type="danger">
              {error}
            </Alert>
            <Button onClick={() => navigate('/admin')}>
              Voltar para Administração
            </Button>
          </EditPostContainer>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <EditPostContainer>
          <PageTitle>Editar Postagem</PageTitle>
          
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
                  disabled={saving}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={saving || !formData.title.trim() || !formData.content.trim()}
                >
                  {saving ? 'Salvando...' : 'Salvar Alterações'}
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
                <span>• Atualizado em {formatDate(new Date())}</span>
              </PreviewMeta>
              
              {formData.content && (
                <PreviewContent>
                  {formData.content}
                </PreviewContent>
              )}
            </PreviewCard>
          )}
        </EditPostContainer>
      </Layout>
    </ProtectedRoute>
  );
};

export default EditPost;