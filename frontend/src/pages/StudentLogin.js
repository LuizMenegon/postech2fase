import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Button, Input, Alert } from '../styles/GlobalStyles';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import Layout from '../components/Layout';

const LoginContainer = styled(Container)`
  max-width: 400px;
  padding-top: 4rem;
`;

const LoginCard = styled(Card)`
  text-align: center;
`;

const LoginTitle = styled.h2`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StudentInfo = styled.div`
  background: ${props => props.theme.colors.background};
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: left;
`;

const InfoTitle = styled.h4`
  color: ${props => props.theme.colors.primary};
  margin-bottom: 0.5rem;
`;

const InfoText = styled.p`
  margin: 0.25rem 0;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
`;

const LinkContainer = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const StudentLogin = () => {
  const navigate = useNavigate();
  const { login } = useStudentAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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
      await login(formData.email, formData.password);
      navigate('/student-dashboard');
    } catch (err) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <LoginContainer>
        <LoginCard>
          <LoginTitle>🎓 Login de Estudante</LoginTitle>
          
          <StudentInfo>
            <InfoTitle>Dados para Demonstração:</InfoTitle>
            <InfoText><strong>Email:</strong> ana.silva@aluno.postech.com</InfoText>
            <InfoText><strong>Email:</strong> carlos.santos@aluno.postech.com</InfoText>
            <InfoText><strong>Email:</strong> maria.oliveira@aluno.postech.com</InfoText>
            <InfoText><strong>Senha:</strong> 123456 (para todos)</InfoText>
          </StudentInfo>
          
          {error && <Alert type="danger">{error}</Alert>}
          
          <LoginForm onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              placeholder="Email institucional"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <Input
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleChange}
              required
            />
            
            <Button 
              type="submit" 
              disabled={loading}
              style={{ marginTop: '1rem' }}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </LoginForm>
          
          <LinkContainer>
            <StyledLink to="/login">← Voltar para login de professores</StyledLink>
            <br />
            <StyledLink to="/">Ir para página inicial</StyledLink>
          </LinkContainer>
        </LoginCard>
      </LoginContainer>
    </Layout>
  );
};

export default StudentLogin;