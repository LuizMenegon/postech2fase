# Frontend React - Blog Postech

Frontend desenvolvido em React para o sistema de blog dos professores da Postech - 2ª Fase.

## 🚀 Funcionalidades Implementadas

### ✅ Páginas Principais
- **Página Principal**: Lista de posts com busca e filtros
- **Página de Leitura**: Visualização completa do post com sistema de comentários
- **Página de Criação**: Formulário para criação de novos posts (apenas professores autenticados)
- **Página de Edição**: Formulário para edição de posts existentes
- **Página Administrativa**: Gerenciamento de todos os posts com opções de editar/excluir
- **Página de Login**: Autenticação para professores

### ✅ Funcionalidades Técnicas
- **React com Hooks**: Componentes funcionais e hooks personalizados
- **Context API**: Gerenciamento de estado global para autenticação e posts
- **React Router**: Navegação entre páginas com rotas protegidas
- **Styled Components**: Estilização responsiva e tema consistente
- **Responsividade**: Interface adaptável para mobile e desktop
- **Sistema de Busca**: Filtro de posts por título, autor e conteúdo
- **Autenticação**: Login/logout com proteção de rotas
- **Preview**: Visualização de posts antes da publicação

## 📱 Design Responsivo

O frontend foi desenvolvido com foco em responsividade:
- Layout flexível que se adapta a diferentes tamanhos de tela
- Menu responsivo no header
- Cards de posts otimizados para mobile
- Formulários adaptáveis
- Botões e navegação touch-friendly

## 🛠️ Tecnologias Utilizadas

- **React** 18.2.0
- **React Router DOM** 6.16.0
- **Styled Components** 6.0.8
- **Axios** 1.5.1
- **Context API** (gerenciamento de estado)

## 📦 Instalação e Execução

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Passos para instalação:

1. **Navegue para o diretório do frontend:**
   ```bash
   cd frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente (opcional):**
   Crie um arquivo `.env` na raiz do projeto frontend:
   ```
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. **Execute o projeto em modo de desenvolvimento:**
   ```bash
   npm start
   ```

5. **Acesse a aplicação:**
   Abra seu navegador em `http://localhost:3000`

### Scripts Disponíveis

- `npm start`: Executa em modo de desenvolvimento
- `npm run build`: Gera build para produção
- `npm test`: Executa os testes
- `npm run eject`: Ejeta as configurações do Create React App

## 🔐 Sistema de Autenticação

### Para demonstração:
- **Email**: Qualquer email válido (ex: professor@postech.com)
- **Senha**: Qualquer senha com 6+ caracteres (ex: 123456)

### Funcionalidades:
- Login/logout
- Proteção de rotas administrativas
- Persistência de sessão no localStorage
- Redirecionamento após login

## 📊 Estrutura do Projeto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Layout.js
│   │   ├── Loading.js
│   │   ├── ProtectedRoute.js
│   │   ├── PostCard.js
│   │   └── SearchBar.js
│   ├── contexts/           # Context API
│   │   ├── AuthContext.js
│   │   └── PostsContext.js
│   ├── pages/              # Páginas da aplicação
│   │   ├── Home.js
│   │   ├── PostDetail.js
│   │   ├── CreatePost.js
│   │   ├── EditPost.js
│   │   ├── Admin.js
│   │   └── Login.js
│   ├── services/           # Serviços de API
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── postsService.js
│   ├── styles/             # Estilos globais e tema
│   │   └── GlobalStyles.js
│   ├── App.js              # Componente principal
│   └── index.js            # Ponto de entrada
├── package.json
└── README.md
```

## 🎨 Tema e Estilização

O projeto utiliza um sistema de tema consistente com:
- Paleta de cores profissional
- Tipografia legível
- Espaçamentos padronizados
- Componentes estilizados reutilizáveis
- Breakpoints responsivos

### Cores principais:
- **Primary**: #007bff (Azul)
- **Success**: #28a745 (Verde)
- **Danger**: #dc3545 (Vermelho)
- **Background**: #f5f5f5 (Cinza claro)

## 🔗 Integração com Backend

O frontend está preparado para integração com o backend:
- Serviços de API configurados
- Interceptors para autenticação
- Tratamento de erros
- Estados de loading

**Nota**: Atualmente usando dados mock para demonstração. Para conectar com o backend real, descomente os códigos de API nos serviços e ajuste as URLs conforme necessário.

## 📱 Funcionalidades por Página

### 🏠 Home (Página Principal)
- Lista todos os posts disponíveis
- Sistema de busca em tempo real
- Cards responsivos com preview dos posts
- Navegação para leitura completa

### 📖 Detalhes do Post
- Conteúdo completo formatado
- Sistema de comentários (para usuários logados)
- Informações do autor e data
- Navegação de volta

### ✍️ Criar Post (Protegida)
- Formulário validado
- Preview em tempo real
- Contador de caracteres
- Confirmação de cancelamento

### ✏️ Editar Post (Protegida)
- Carrega dados existentes
- Detecta mudanças não salvas
- Preview das alterações
- Validações de formulário

### 🛡️ Administração (Protegida)
- Dashboard com estatísticas
- Lista de todos os posts
- Ações de editar/excluir
- Busca e filtros
- Modal de confirmação para exclusões

### 🔐 Login
- Formulário de autenticação
- Validações de email/senha
- Redirecionamento pós-login
- Informações para demonstração

## 🚀 Próximos Passos

Para integração completa com o backend:

1. **Configurar variáveis de ambiente**
2. **Conectar serviços de API reais**
3. **Implementar autenticação JWT**
4. **Adicionar validações de servidor**
5. **Configurar proxy reverso**
6. **Implementar testes unitários**

## 🤝 Contribuição

Este projeto foi desenvolvido seguindo as melhores práticas de React e está pronto para integração com o backend existente do projeto Postech 2ª Fase.