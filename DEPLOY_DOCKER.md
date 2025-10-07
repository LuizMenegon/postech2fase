# 🐳 Deploy com Docker - Blog POSTECH

Este guia explica como executar toda a aplicação usando Docker e docker-compose.

## 📋 Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) instalado
- Mínimo 4GB de RAM disponível
- Portas 3000, 3001 e 5432 livres

## 🚀 Execução Rápida

### 1. Clone e navegue para o projeto
```bash
git clone <seu-repositorio>
cd postech2fase
```

### 2. Configure as variáveis de ambiente
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações (opcional)
# As configurações padrão já funcionam para desenvolvimento
```

### 3. Execute a aplicação completa
```bash
# Constroi e inicia todos os serviços
docker-compose up --build

# Para executar em background (detached)
docker-compose up --build -d
```

### 4. Acesse a aplicação
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Banco PostgreSQL**: localhost:5432

## 🏗️ Arquitetura dos Containers

### 📊 Serviços
- **database**: PostgreSQL 15 com dados iniciais
- **backend**: API Node.js/Express com Sequelize
- **frontend**: React SPA servido via Nginx

### 🔗 Rede
- Rede interna: `blog_network`
- Comunicação entre containers por nome do serviço
- Exposição apenas das portas necessárias

### 💾 Volumes
- `postgres_data`: Dados persistentes do PostgreSQL
- `./logs`: Logs do backend (bind mount)

## 🛠️ Comandos Úteis

### Gerenciamento dos containers
```bash
# Ver status dos serviços
docker-compose ps

# Ver logs de todos os serviços
docker-compose logs

# Ver logs de um serviço específico
docker-compose logs backend
docker-compose logs frontend
docker-compose logs database

# Parar todos os serviços
docker-compose down

# Parar e remover volumes (CUIDADO: apaga dados do banco)
docker-compose down -v

# Rebuild de um serviço específico
docker-compose up --build backend
```

### Debug e manutenção
```bash
# Executar comando no container do backend
docker-compose exec backend npm run test

# Acessar shell do container
docker-compose exec backend sh
docker-compose exec database psql -U admin -d postech_blog

# Ver logs em tempo real
docker-compose logs -f backend
```

### Desenvolvimento
```bash
# Rebuild apenas quando há mudanças no código
docker-compose up --build --force-recreate

# Executar apenas o banco (para desenvolvimento local)
docker-compose up database

# Executar sem o frontend (API + DB)
docker-compose up database backend
```

## 🔧 Configuração Avançada

### Variáveis de Ambiente (.env)
```env
# Banco de Dados
DB_HOST=database
DB_PORT=5432
DB_NAME=postech_blog
DB_USER=admin
DB_PASSWORD=admin123

# Servidor
NODE_ENV=production
PORT=3001

# Segurança
JWT_SECRET=seu_jwt_secret_super_seguro_aqui

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Dados Iniciais
O arquivo `init.sql` cria:
- Tabela Posts com estrutura completa
- 3 posts de exemplo
- Índices para performance
- Permissões necessárias

### Health Checks
Todos os serviços possuem health checks:
- **Backend**: `GET /health`
- **Frontend**: Nginx status
- **Database**: PostgreSQL ready check

## 🔍 Troubleshooting

### Container não inicia
```bash
# Verificar logs detalhados
docker-compose logs [service-name]

# Verificar status dos containers
docker ps -a

# Verificar uso de recursos
docker stats
```

### Problemas de conectividade
```bash
# Verificar rede
docker network ls
docker network inspect postech2fase_blog_network

# Testar conectividade entre containers
docker-compose exec backend ping database
```

### Reset completo
```bash
# Parar e remover tudo
docker-compose down -v --rmi all

# Limpar cache do Docker
docker system prune -a

# Rebuild completo
docker-compose up --build --force-recreate
```

### Banco não inicializa
```bash
# Verificar permissões do volume
docker-compose logs database

# Remover volume e recriar
docker-compose down -v
docker volume rm postech2fase_postgres_data
docker-compose up database
```

## 🚀 Deploy em Produção

### Modificações necessárias:
1. **Variáveis de ambiente seguras**
2. **SSL/HTTPS configurado**
3. **Proxy reverso (nginx/apache)**
4. **Backup automático do banco**
5. **Monitoring e logs centralizados**

### Exemplo de comando para produção:
```bash
# Build para produção
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
```

## 📚 Estrutura de Arquivos Docker

```
postech2fase/
├── docker-compose.yml          # Orquestração dos serviços
├── Dockerfile                  # Container do backend
├── .env.example               # Exemplo de variáveis
├── init.sql                   # Script inicial do banco
├── frontend/
│   ├── Dockerfile             # Container do frontend
│   └── nginx.conf             # Configuração Nginx
└── DEPLOY_DOCKER.md           # Este arquivo
```

## ✅ Verificação da Instalação

Após executar `docker-compose up --build`, verifique:

1. **Containers rodando**: `docker-compose ps`
2. **Frontend acessível**: http://localhost:3000
3. **API respondendo**: http://localhost:3001/health
4. **Banco conectado**: Logs do backend sem erros
5. **Posts carregando**: Posts aparecem na página inicial

---

🎉 **Pronto!** Sua aplicação está rodando completamente em containers Docker.