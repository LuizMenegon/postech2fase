# WE Learn - Sistema de Gestão Educacional

## 📚 Sobre o Projeto

WE Learn é uma API REST para gestão de sistema educacional, desenvolvida em Node.js com Express e PostgreSQL. O sistema permite o gerenciamento de professores, disciplinas e turmas de forma integrada.

Este projeto faz parte da segunda fase da Pós-Tech FIAP Full Stack.

## 🚀 Tecnologias Utilizadas

- **Backend**: Node.js, Express.js
- **Banco de Dados**: PostgreSQL
- **ORM**: Sequelize
- **Containerização**: Docker, Docker Compose
- **Outras**: CORS, Body-parser

## 📁 Estrutura do Projeto

```
postech2fase/
├── src/
│   ├── app.js              # Arquivo principal da aplicação
│   ├── config/
│   │   ├── database.js     # Configurações do banco
│   │   └── sequelize.js    # Configuração do Sequelize
│   ├── controllers/
│   │   └── controller.js   # Controllers da API
│   ├── models/
│   │   ├── Teacher.js      # Modelo de Professor
│   │   ├── Discipline.js   # Modelo de Disciplina
│   │   ├── Class.js        # Modelo de Turma
│   │   └── index.js        # Índice dos modelos
│   └── routers/
│       └── route1.js       # Definição das rotas
├── docker-compose.yaml     # Configuração do Docker Compose
├── Dockerfile              # Dockerfile da aplicação
└── package.json            # Dependências e scripts
```

## 🗄️ Modelos de Dados

### Teacher (Professor)
- ID (Primary Key, Auto Increment)
- name (String, obrigatório)
- email (String, obrigatório, único)

### Discipline (Disciplina)
- ID (Primary Key, Auto Increment)
- name (String, obrigatório)
- teacherId (Foreign Key para Teacher)
- description (Text, opcional)

### Class (Turma)
- ID (Primary Key, Auto Increment)
- name (String, obrigatório)
- disciplineId (Foreign Key para Discipline)
- description (Text, opcional)
- image (BLOB, opcional)
- startDate (Date)

## 🛠️ Instalação e Execução

### Pré-requisitos
- Node.js (versão 16+)
- Docker e Docker Compose

### 1. Clone o repositório
```bash
git clone https://github.com/LuizMenegon/postech2fase.git
cd postech2fase
```

### 2. Usando Docker (Recomendado)
```bash
# Subir os serviços
docker-compose up -d

# Verificar logs
docker-compose logs -f app
```

### 3. Execução local (alternativa)
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Executar em modo produção
npm start
```

## 📡 API Endpoints

### Professores (Teachers)
- `POST /api/createTeacher` - Criar professor
- `GET /api/getTeacher/:id` - Buscar professor por ID
- `PUT /api/updateTeacher/:id` - Atualizar professor
- `DELETE /api/deleteTeacher/:id` - Deletar professor

### Disciplinas (Disciplines)
- `POST /api/createDiscipline` - Criar disciplina
- `GET /api/getDiscipline/:id` - Buscar disciplina por ID
- `PUT /api/updateDiscipline/:id` - Atualizar disciplina
- `DELETE /api/deleteDiscipline/:id` - Deletar disciplina

### Turmas (Classes)
- `POST /api/createClass` - Criar turma
- `GET /api/getClass/:id` - Buscar turma por ID
- `GET /api/getAllClasses` - Listar todas as turmas
- `PUT /api/updateClass/:id` - Atualizar turma
- `DELETE /api/deleteClass/:id` - Deletar turma

## 📋 Exemplos de Uso

### Criar Professor
```bash
POST /api/createTeacher
Content-Type: application/json

{
    "name": "João Silva",
    "email": "joao.silva@escola.com.br"
}
```

### Criar Disciplina
```bash
POST /api/createDiscipline
Content-Type: application/json

{
    "name": "Matemática",
    "teacherId": 1,
    "description": "Disciplina de matemática básica"
}
```

### Criar Turma
```bash
POST /api/createClass
Content-Type: application/json

{
    "name": "Turma A - Matemática",
    "disciplineId": 1,
    "description": "Turma de matemática para iniciantes",
    "startDate": "2025-08-15"
}
```

## 🐳 Configuração do Docker

A aplicação utiliza Docker Compose com os seguintes serviços:

- **app**: Aplicação Node.js (porta 3000)
- **db**: PostgreSQL 15 (porta 5432)

### Variáveis de Ambiente
- `DATABASE_URL`: postgresql://postgres:postgres@db:5432/welearn
- `PORT`: 3000 (padrão)

## 🔧 Scripts Disponíveis

```bash
npm start      # Executar aplicação em produção
npm run dev    # Executar com nodemon (desenvolvimento)
npm test       # Executar testes (não implementado)
```

## 📊 Status do Projeto

✅ CRUD de Professores  
✅ CRUD de Disciplinas  
✅ CRUD de Turmas  
✅ Containerização com Docker  
✅ Relacionamentos entre entidades  

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

## 👨‍💻 Autor

**Luiz Menegon**  
GitHub: [@LuizMenegon](https://github.com/LuizMenegon)

---

📍 **Porta da aplicação**: 3000  
🗄️ **Banco de dados**: PostgreSQL (porta 5432)  
🌐 **Base URL**: `http://localhost:3000/api`
