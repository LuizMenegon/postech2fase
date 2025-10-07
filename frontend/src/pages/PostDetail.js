import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Button, Alert, Textarea, FormGroup, Label } from '../styles/GlobalStyles';
import { usePosts } from '../contexts/PostsContext';
import { useAuth } from '../contexts/AuthContext';
import { postsService } from '../services/postsService';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

const PostContainer = styled(Container)`
  max-width: 800px;
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  margin-bottom: 2rem;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const PostCard = styled(Card)`
  margin-bottom: 2rem;
`;

const PostTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    font-size: 2rem;
  }
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.textSecondary};
`;

const PostAuthor = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const PostDate = styled.span``;

const PostContent = styled.div`
  color: ${props => props.theme.colors.text};
  line-height: 1.8;
  font-size: 1.1rem;
  
  p {
    margin-bottom: 1rem;
  }
  
  h2, h3, h4 {
    margin: 2rem 0 1rem;
    color: ${props => props.theme.colors.primary};
  }
  
  blockquote {
    border-left: 4px solid ${props => props.theme.colors.primary};
    padding-left: 1rem;
    margin: 1rem 0;
    font-style: italic;
    background-color: ${props => props.theme.colors.light};
    padding: 1rem;
    border-radius: ${props => props.theme.borderRadius};
  }
`;

const CommentsSection = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const CommentForm = styled(Card)`
  margin-bottom: 2rem;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentItem = styled(Card)`
  background-color: ${props => props.theme.colors.light};
`;

const CommentMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const CommentAuthor = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const CommentContent = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
`;

const EmptyComments = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const PostDetail = () => {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const { posts, currentPost, setCurrentPost, clearCurrentPost } = usePosts();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    loadPost();
    loadComments();
    
    return () => {
      clearCurrentPost();
    };
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Primeiro, tentar encontrar o post nos posts do contexto (posts criados dinamicamente)
      const contextPost = posts.find(post => post.ID === parseInt(id) || post.id === parseInt(id));
      
      if (contextPost) {
        setCurrentPost(contextPost);
        return;
      }
      
      // Se não encontrar no contexto, tentar API real
      try {
        const post = await postsService.getPostById(id);
        setCurrentPost(post);
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
- **Grande ecossistema**: Muitas bibliotecas e ferramentas disponíveis

## Conceitos Fundamentais

### Componentes

Os componentes são a base do React. Eles podem ser funcionais ou de classe:

\`\`\`jsx
function MeuComponente() {
  return <div>Olá, mundo!</div>;
}
\`\`\`

### Props

Props são propriedades passadas para componentes:

\`\`\`jsx
function Saudacao({ nome }) {
  return <h1>Olá, {nome}!</h1>;
}
\`\`\`

### State

O state permite que componentes tenham dados dinâmicos:

\`\`\`jsx
const [contador, setContador] = useState(0);
\`\`\`

## Conclusão

React é uma ferramenta poderosa que facilita o desenvolvimento de interfaces modernas e interativas. Com sua curva de aprendizado relativamente suave e documentação excelente, é uma escolha ideal para desenvolvedores iniciantes e experientes.`,
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
\`\`\`

## Funções

As funções são blocos de código reutilizáveis:

\`\`\`javascript
function somar(a, b) {
  return a + b;
}

// Arrow function
const multiplicar = (a, b) => a * b;
\`\`\`

## Arrays e Métodos

Arrays são estruturas de dados fundamentais:

\`\`\`javascript
const numeros = [1, 2, 3, 4, 5];
const pares = numeros.filter(n => n % 2 === 0);
const dobrados = numeros.map(n => n * 2);
\`\`\`

JavaScript é uma linguagem versátil e poderosa que continua evoluindo constantemente.`,
          author: 'Prof. Maria Santos',
          createdAt: new Date('2024-01-10'),
        },
        3: {
          id: 3,
          title: 'Desenvolvimento Backend com Node.js',
          content: `Node.js permite executar JavaScript no servidor, abrindo um mundo de possibilidades para desenvolvimento full-stack.

## O que é Node.js?

Node.js é um runtime JavaScript construído no motor V8 do Chrome. Ele permite executar JavaScript fora do navegador, especialmente no servidor.

## Criando um Servidor Simples

\`\`\`javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Olá, mundo!');
});

server.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
\`\`\`

## Express.js

O Express é o framework web mais popular para Node.js:

\`\`\`javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Olá, Express!');
});

app.listen(3000);
\`\`\`

Node.js é fundamental para o desenvolvimento moderno de aplicações web.`,
          author: 'Prof. Pedro Oliveira',
          createdAt: new Date('2024-01-05'),
        }
      };
      
      const post = mockPosts[id];
      if (!post) {
        throw new Error('Post não encontrado');
      }
      
      setCurrentPost(post);
      
      // Código para API real (comentado até backend estar pronto)
      // const post = await postsService.getPostById(id);
      // setCurrentPost(post);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    try {
      // Simulando comentários
      const mockComments = [
        {
          id: 1,
          content: 'Excelente artigo! Muito esclarecedor sobre os conceitos básicos do React.',
          author: 'Ana Costa',
          createdAt: new Date('2024-01-16'),
        },
        {
          id: 2,
          content: 'Obrigado por compartilhar esse conhecimento. Estava procurando justamente por isso!',
          author: 'Carlos Ferreira',
          createdAt: new Date('2024-01-17'),
        }
      ];
      
      setComments(mockComments);
      
      // Código para API real (comentado até backend estar pronto)
      // const comments = await commentsService.getCommentsByPostId(id);
      // setComments(comments);
      
    } catch (err) {
      console.error('Erro ao carregar comentários:', err);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    try {
      setSubmittingComment(true);
      
      // Simulando criação de comentário
      const mockNewComment = {
        id: Date.now(),
        content: newComment,
        author: user?.name || 'Usuário Anônimo',
        createdAt: new Date(),
      };
      
      setComments(prev => [mockNewComment, ...prev]);
      setNewComment('');
      
      // Código para API real (comentado até backend estar pronto)
      // const comment = await commentsService.createComment(id, {
      //   content: newComment,
      //   author: user.name
      // });
      // setComments(prev => [comment, ...prev]);
      // setNewComment('');
      
    } catch (err) {
      setError('Erro ao enviar comentário');
    } finally {
      setSubmittingComment(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Layout>
        <Loading text="Carregando post..." />
      </Layout>
    );
  }

  if (error || !currentPost) {
    return (
      <Layout>
        <PostContainer>
          <BackButton to="/">← Voltar para início</BackButton>
          <Alert type="danger">
            {error || 'Post não encontrado'}
          </Alert>
        </PostContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <PostContainer>
        <BackButton to="/">← Voltar para início</BackButton>
        
        <PostCard>
          <PostTitle>{currentPost.title}</PostTitle>
          
          <PostMeta>
            <PostAuthor>Por {currentPost.author}</PostAuthor>
            <PostDate>• {formatDate(currentPost.createdAt)}</PostDate>
          </PostMeta>
          
          <PostContent>
            {currentPost.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </PostContent>
        </PostCard>
        
        <CommentsSection>
          <SectionTitle>Comentários ({comments.length})</SectionTitle>
          
          {isAuthenticated && (
            <CommentForm>
              <form onSubmit={handleSubmitComment}>
                <FormGroup>
                  <Label>Deixe seu comentário:</Label>
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Digite seu comentário..."
                    disabled={submittingComment}
                  />
                </FormGroup>
                <Button 
                  type="submit" 
                  disabled={!newComment.trim() || submittingComment}
                >
                  {submittingComment ? 'Enviando...' : 'Comentar'}
                </Button>
              </form>
            </CommentForm>
          )}
          
          {comments.length > 0 ? (
            <CommentsList>
              {comments.map(comment => (
                <CommentItem key={comment.id}>
                  <CommentMeta>
                    <CommentAuthor>{comment.author}</CommentAuthor>
                    <span>{formatDate(comment.createdAt)}</span>
                  </CommentMeta>
                  <CommentContent>{comment.content}</CommentContent>
                </CommentItem>
              ))}
            </CommentsList>
          ) : (
            <EmptyComments>
              <p>Ainda não há comentários neste post.</p>
              {isAuthenticated && <p>Seja o primeiro a comentar!</p>}
            </EmptyComments>
          )}
          
          {!isAuthenticated && (
            <Alert type="info">
              <Link to="/login">Faça login</Link> para comentar neste post.
            </Alert>
          )}
        </CommentsSection>
      </PostContainer>
    </Layout>
  );
};

export default PostDetail;