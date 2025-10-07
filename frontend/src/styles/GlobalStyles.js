import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    border: none;
    outline: none;
  }
`;

export const theme = {
  colors: {
    primary: '#007bff',
    primaryDark: '#0056b3',
    secondary: '#6c757d',
    success: '#28a745',
    danger: '#dc3545',
    warning: '#ffc107',
    info: '#17a2b8',
    light: '#f8f9fa',
    dark: '#343a40',
    white: '#ffffff',
    background: '#f5f5f5',
    text: '#333333',
    textSecondary: '#6c757d',
    border: '#dee2e6'
  },
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '3rem'
  },
  borderRadius: '0.375rem',
  boxShadow: '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)'
};

// Componentes base reutilizáveis
export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0 ${props => props.theme.spacing.sm};
  }
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  padding: ${props => props.theme.spacing.lg};
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const Button = styled.button`
  background-color: ${props => {
    switch (props.variant) {
      case 'secondary':
        return props.theme.colors.secondary;
      case 'success':
        return props.theme.colors.success;
      case 'danger':
        return props.theme.colors.danger;
      case 'warning':
        return props.theme.colors.warning;
      case 'outline':
        return 'transparent';
      default:
        return props.theme.colors.primary;
    }
  }};
  color: ${props => props.variant === 'outline' ? props.theme.colors.primary : props.theme.colors.white};
  border: ${props => props.variant === 'outline' ? `1px solid ${props.theme.colors.primary}` : 'none'};
  padding: ${props => props.size === 'sm' ? '0.375rem 0.75rem' : '0.5rem 1rem'};
  border-radius: ${props => props.theme.borderRadius};
  font-size: ${props => props.size === 'sm' ? '0.875rem' : '1rem'};
  font-weight: 500;
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.sm};
  transition: all 0.2s ease-in-out;
  min-width: ${props => props.fullWidth ? '100%' : 'auto'};

  &:hover {
    background-color: ${props => {
      switch (props.variant) {
        case 'secondary':
          return '#5a6268';
        case 'success':
          return '#218838';
        case 'danger':
          return '#c82333';
        case 'warning':
          return '#e0a800';
        case 'outline':
          return props.theme.colors.primary;
        default:
          return props.theme.colors.primaryDark;
      }
    }};
    color: ${props => props.variant === 'outline' ? props.theme.colors.white : props.theme.colors.white};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.white};
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const Textarea = styled.textarea`
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => props.theme.colors.white};
  font-size: 1rem;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.md};
`;

export const Label = styled.label`
  display: block;
  margin-bottom: ${props => props.theme.spacing.sm};
  font-weight: 500;
  color: ${props => props.theme.colors.text};
`;

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: 0.875rem;
  margin-top: ${props => props.theme.spacing.xs};
`;

export const LoadingSpinner = styled.div`
  border: 2px solid ${props => props.theme.colors.light};
  border-top: 2px solid ${props => props.theme.colors.primary};
  border-radius: 50%;
  width: ${props => props.size || '20px'};
  height: ${props => props.size || '20px'};
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export const Alert = styled.div`
  padding: 0.75rem 1rem;
  margin-bottom: ${props => props.theme.spacing.md};
  border: 1px solid transparent;
  border-radius: ${props => props.theme.borderRadius};
  background-color: ${props => {
    switch (props.type) {
      case 'success':
        return '#d4edda';
      case 'danger':
        return '#f8d7da';
      case 'warning':
        return '#fff3cd';
      case 'info':
        return '#d1ecf1';
      default:
        return '#d1ecf1';
    }
  }};
  color: ${props => {
    switch (props.type) {
      case 'success':
        return '#155724';
      case 'danger':
        return '#721c24';
      case 'warning':
        return '#856404';
      case 'info':
        return '#0c5460';
      default:
        return '#0c5460';
    }
  }};
  border-color: ${props => {
    switch (props.type) {
      case 'success':
        return '#c3e6cb';
      case 'danger':
        return '#f5c6cb';
      case 'warning':
        return '#ffeaa7';
      case 'info':
        return '#bee5eb';
      default:
        return '#bee5eb';
    }
  }};
`;