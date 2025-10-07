import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Container, Card, Button, Input, FormGroup, Label, Alert } from '../styles/GlobalStyles';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/Layout';

const LoginContainer = styled(Container)`
  max-width: 400px;
  padding-top: 3rem;
`;

const LoginCard = styled(Card)`
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const PageTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  margin-bottom: 2rem;
  text-align: center;
  font-size: 2rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const RememberGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Checkbox = styled.input`
  width: auto;
`;

const CheckboxLabel = styled.label`
  font-size: 0.875rem;
  color: ${props => props.theme.colors.textSecondary};
  cursor: pointer;
`;

const LoginButton = styled(Button)`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
`;

const InfoSection = styled.div`
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.colors.border};
  text-align: center;
`;

const InfoTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  margin-bottom: 1rem;
`;

const InfoText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 0.5rem;
`;

const BackLink = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, loading, error, clearError } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Limpar erro quando o usuário começar a digitar
    if (error) clearError();
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      return 'O email é obrigatório';
    }
    
    if (!formData.email.includes('@')) {
      return 'Por favor, digite um email válido';
    }
    
    if (!formData.password) {
      return 'A senha é obrigatória';
    }
    
    if (formData.password.length < 6) {
      return 'A senha deve ter pelo menos 6 caracteres';
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      // Aqui normalmente definiríamos o erro no contexto
      return;
    }
    
    try {
      setIsSubmitting(true);
      const success = await login(formData.email, formData.password);
      
      if (success) {
        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (err) {
      // Erro já tratado no contexto
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <LoginContainer>
          <LoginCard>
            <PageTitle>Carregando...</PageTitle>
          </LoginCard>
        </LoginContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <LoginContainer>
        <LoginCard>
          <PageTitle>Login</PageTitle>
          
          {error && (
            <Alert type="danger">
              {error}
            </Alert>
          )}
          
          <LoginForm onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Digite seu email..."
                required
                autoComplete="email"
              />
            </FormGroup>
            
            <FormGroup>
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Digite sua senha..."
                required
                autoComplete="current-password"
              />
            </FormGroup>
            
            <RememberGroup>
              <Checkbox
                id="remember"
                name="remember"
                type="checkbox"
                checked={formData.remember}
                onChange={handleInputChange}
              />
              <CheckboxLabel htmlFor="remember">
                Lembrar de mim
              </CheckboxLabel>
            </RememberGroup>
            
            <LoginButton 
              type="submit" 
              disabled={isSubmitting || !formData.email || !formData.password}
            >
              {isSubmitting ? 'Entrando...' : 'Entrar'}
            </LoginButton>
          </LoginForm>
          
          <InfoSection>
            <InfoTitle>Acesso para Professores</InfoTitle>
            <InfoText>
              Este sistema é exclusivo para professores da Postech.
            </InfoText>
            <InfoText>
              <strong>Para demonstração, use qualquer email e senha válidos.</strong>
            </InfoText>
            <InfoText>
              Exemplo: professor@postech.com / 123456
            </InfoText>
          </InfoSection>
          
          <BackLink to="/">
            ← Voltar para página inicial
          </BackLink>
        </LoginCard>
      </LoginContainer>
    </Layout>
  );
};

export default Login;