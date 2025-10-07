import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Card, Button } from '../styles/GlobalStyles';

const PostCardContainer = styled(Card)`
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const PostTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  line-height: 1.4;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
`;

const PostAuthor = styled.span`
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

const PostDate = styled.span``;

const PostExcerpt = styled.p`
  color: ${props => props.theme.colors.text};
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const PostActions = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
`;

const ReadMoreLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const AdminActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const PostCard = ({ post, showAdminActions = false, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getExcerpt = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  return (
    <PostCardContainer>
      <PostTitle>{post.title}</PostTitle>
      
      <PostMeta>
        <PostAuthor>Por {post.author}</PostAuthor>
        <PostDate>• {formatDate(post.createdAt || new Date())}</PostDate>
      </PostMeta>
      
      <PostExcerpt>
        {getExcerpt(post.content)}
      </PostExcerpt>
      
      <PostActions>
        <ReadMoreLink to={`/post/${post.id}`}>
          Ler mais →
        </ReadMoreLink>
        
        {showAdminActions && (
          <AdminActions>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => onEdit(post.id)}
            >
              Editar
            </Button>
            <Button 
              size="sm" 
              variant="danger" 
              onClick={() => onDelete(post.id)}
            >
              Excluir
            </Button>
          </AdminActions>
        )}
      </PostActions>
    </PostCardContainer>
  );
};

export default PostCard;