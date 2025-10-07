# 🚀 Instruções para Executar o Frontend React

## Instalação das Dependências

1. **Abra o terminal no diretório do frontend:**
   ```bash
   cd C:\Users\Luiz Fernando\Desktop\1\postech2fase\frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

## Executando a Aplicação

1. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm start
   ```

2. **Acesse a aplicação:**
   - Abra seu navegador em: `http://localhost:3000`
   - A aplicação será aberta automaticamente

## 🔐 Como Testar o Sistema

### Para usar como visitante (sem login):
- Navegue pela página principal
- Clique em qualquer post para ler o conteúdo completo
- Use a barra de busca para filtrar posts

### Para testar como professor (com login):
1. **Clique em "Login" no header**
2. **Use qualquer email e senha válidos para demonstração:**
   - Email: `professor@postech.com`
   - Senha: `123456`
   
3. **Funcionalidades disponíveis após login:**
   - Criar novos posts
   - Editar posts existentes
   - Administrar todos os posts
   - Comentar em posts

## 📱 Funcionalidades para Testar

### ✅ Página Principal
- [x] Lista de posts
- [x] Sistema de busca
- [x] Responsividade mobile/desktop

### ✅ Página de Post
- [x] Visualização completa
- [x] Sistema de comentários (logado)
- [x] Navegação

### ✅ Criação de Post (Requer Login)
- [x] Formulário validado
- [x] Preview em tempo real
- [x] Salvamento

### ✅ Edição de Post (Requer Login)
- [x] Carregamento de dados
- [x] Edição com preview
- [x] Salvamento de alterações

### ✅ Página Administrativa (Requer Login)
- [x] Dashboard com estatísticas
- [x] Lista de posts
- [x] Editar/Excluir posts
- [x] Sistema de busca

## 🛠️ Scripts Disponíveis

- `npm start` - Modo desenvolvimento (porta 3000)
- `npm run build` - Build para produção
- `npm test` - Executar testes
- `npm run eject` - Ejetar configurações

## 📝 Observações Importantes

### Dados Mock
- A aplicação usa dados simulados para demonstração
- Posts, comentários e autenticação são mockados
- Para integrar com backend real, descomente códigos nos serviços

### Responsividade
- Testado em desktop, tablet e mobile
- Layout flexível e adaptável
- Menu responsivo

### Estado da Aplicação
- Dados persistem durante a sessão
- Login mantém estado no localStorage
- Navegação preserva contexto

## 🔧 Solução de Problemas

### Porta já em uso:
```bash
# Se a porta 3000 estiver ocupada, especifique outra:
PORT=3001 npm start
```

### Problemas de dependências:
```bash
# Limpe cache e reinstale:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Erro de CORS (se testando com backend):
- Configure CORS no backend
- Ou use proxy no package.json

## 📧 Contato

Para dúvidas sobre o frontend React, consulte a documentação no README.md principal.