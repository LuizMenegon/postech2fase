import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Button, Input, Textarea, Alert } from '../styles/GlobalStyles';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { usePosts } from '../contexts/PostsContext';
import { postsService } from '../services/postsService';
import Layout from '../components/Layout';

const CreateContainer = styled(Container)`
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

const StudentCreatePost = () => {
  const navigate = useNavigate();
  const { student, isAuthenticated } = useStudentAuth();
  const { addPost } = usePosts();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/student-login');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validações
      if (formData.title.length < 5) {
        throw new Error('O título deve ter pelo menos 5 caracteres');
      }
      
      if (formData.content.length < 20) {
        throw new Error('O conteúdo deve ter pelo menos 20 caracteres');
      }

      const postData = {
        title: formData.title,
        content: formData.content,
        author: student.name,
        authorType: 'student',
        authorId: student.ID
      };

      // Mock para demonstração
      const newPost = {
        ...postData,
        ID: Date.now(), // ID temporário
        createdAt: new Date(),
        updatedAt: new Date()
      };

      // Em produção usaria:
      // const newPost = await postsService.createPost(postData);
      
      addPost(newPost);
      navigate('/student-dashboard');
      
    } catch (err) {
      setError(err.message || 'Erro ao criar post');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/student-dashboard');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <Layout>
      <CreateContainer>
        <PageHeader>
          <PageTitle>📝 Criar Novo Post</PageTitle>
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
              <Button type="submit" disabled={loading}>
                {loading ? 'Publicando...' : 'Publicar Post'}
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
      </CreateContainer>
    </Layout>
  );
};

export default StudentCreatePost;