import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Button, Input, Textarea, Alert } from '../styles/GlobalStyles';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { usePosts } from '../contexts/PostsContext';
import { postsService } from '../services/postsService';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

const EditContainer = styled(Container)`
  max-width: 800px;
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
  margin: 0;
`;

const BackButton = styled(Button)`
  background: ${props => props.theme.colors.textSecondary};
  
  &:hover {
    background: ${props => props.theme.colors.text};
  }
`;

const FormCard = styled(Card)`
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const PreviewCard = styled(Card)`
  background: ${props => props.theme.colors.background};
`;

const PreviewTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 1rem;
`;

const PreviewContent = styled.div`
  white-space: pre-wrap;
  line-height: 1.6;
  color: ${props => props.theme.colors.text};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const StudentEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { student, isAuthenticated } = useStudentAuth();
  const { posts, updatePost } = usePosts();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [originalData, setOriginalData] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/student-login');
      return;
    }
    loadPost();
  }, [id, isAuthenticated, navigate]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError('');
      
      // Primeiro, tentar encontrar o post nos posts do contexto
      const contextPost = posts.find(post => post.ID === parseInt(id) || post.id === parseInt(id));
      
      if (contextPost) {
        // Verificar se o post pertence ao estudante atual
        if (contextPost.authorType !== 'student' || 
            (contextPost.authorId !== student.ID && contextPost.author !== student.name)) {
          throw new Error('Você só pode editar seus próprios posts');
        }
        
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
        
        // Verificar permissão
        if (post.authorType !== 'student' || 
            (post.authorId !== student.ID && post.author !== student.name)) {
          throw new Error('Você só pode editar seus próprios posts');
        }
        
        const postData = {
          title: post.title,
          content: post.content
        };
        setFormData(postData);
        setOriginalData(postData);
        return;
      } catch (apiError) {
        console.log('API Error, checking mock data:', apiError);
      }
      
      // Fallback para dados mock se API falhar
      const mockPosts = {
        1: {
          id: 1,
          title: 'Minha Experiência com React',
          content: `Como estudante de Engenharia de Software, tenho explorado React nos últimos meses e gostaria de compartilhar minha experiência.

## Primeiras Impressões

React inicialmente parecia complexo, mas com a prática percebi que:
- O conceito de componentes é muito intuitivo
- JSX facilita a escrita de interfaces
- O ecosystem é muito rico

## Desafios Enfrentados

- Entender o conceito de estado
- Gerenciamento de props
- Lifecycle dos componentes

## Conclusão

React é uma ferramenta poderosa que vale a pena aprender!`,
          author: student.name,
          authorType: 'student',
          createdAt: new Date('2024-01-03'),
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
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      // Validações
      if (formData.title.length < 5) {
        throw new Error('O título deve ter pelo menos 5 caracteres');
      }
      
      if (formData.content.length < 20) {
        throw new Error('O conteúdo deve ter pelo menos 20 caracteres');
      }

      const updatedPostData = {
        ...formData,
        author: student.name,
        authorType: 'student',
        authorId: student.ID,
        updatedAt: new Date()
      };

      // Mock para demonstração
      const updatedPost = {
        ID: parseInt(id),
        id: parseInt(id),
        ...updatedPostData,
        createdAt: originalData.createdAt || new Date()
      };

      // Em produção usaria:
      // const updatedPost = await postsService.updatePost(id, updatedPostData);
      
      updatePost(updatedPost);
      navigate('/student-dashboard');
      
    } catch (err) {
      setError(err.message || 'Erro ao atualizar post');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/student-dashboard');
  };

  const hasChanges = () => {
    return formData.title !== originalData.title || 
           formData.content !== originalData.content;
  };

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <Layout>
        <Loading text="Carregando post..." />
      </Layout>
    );
  }

  if (error && !formData.title) {
    return (
      <Layout>
        <EditContainer>
          <Alert type="danger">{error}</Alert>
          <Button onClick={handleCancel}>← Voltar ao Dashboard</Button>
        </EditContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <EditContainer>
        <PageHeader>
          <PageTitle>✏️ Editar Post</PageTitle>
          <BackButton onClick={handleCancel}>
            ← Voltar ao Dashboard
          </BackButton>
        </PageHeader>

        {error && <Alert type="danger">{error}</Alert>}

        <FormCard>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="title">Título do Post</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Digite um título interessante..."
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={255}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea
                id="content"
                name="content"
                placeholder="Compartilhe seus conhecimentos, experiências ou descobertas..."
                value={formData.content}
                onChange={handleChange}
                required
                rows={15}
                maxLength={10000}
              />
            </FormGroup>

            <ButtonGroup>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
              <Button 
                type="submit" 
                disabled={saving || !hasChanges()}
              >
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </ButtonGroup>
          </Form>
        </FormCard>

        {(formData.title || formData.content) && (
          <PreviewCard>
            <PreviewTitle>Preview do Post</PreviewTitle>
            
            {formData.title && (
              <h2 style={{ color: '#2563eb', marginBottom: '1rem' }}>
                {formData.title}
              </h2>
            )}
            
            <div style={{ 
              marginBottom: '1rem', 
              fontSize: '0.875rem', 
              color: '#6b7280' 
            }}>
              Por {student.name} • Estudante de {student.course}
            </div>
            
            {formData.content && (
              <PreviewContent>{formData.content}</PreviewContent>
            )}
          </PreviewCard>
        )}
      </EditContainer>
    </Layout>
  );
};

export default StudentEditPost;