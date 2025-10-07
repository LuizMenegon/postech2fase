-- Script de inicialização do banco de dados
-- Este arquivo será executado automaticamente quando o container PostgreSQL for criado

-- Criação da tabela Posts (caso use SQL puro ao invés do Sequelize)
CREATE TABLE IF NOT EXISTS "Posts" (
    "ID" SERIAL PRIMARY KEY,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "author" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Inserção de dados de exemplo
INSERT INTO "Posts" ("title", "content", "author", "createdAt", "updatedAt") VALUES
('Bem-vindos ao Blog da POSTECH', 'Este é o primeiro post do nosso blog acadêmico. Aqui compartilharemos conhecimentos, experiências e descobertas do mundo da tecnologia e inovação.', 'Prof. Silva', NOW(), NOW()),
('Inteligência Artificial na Educação', 'A inteligência artificial está revolucionando a forma como ensinamos e aprendemos. Neste post, exploramos as principais aplicações da IA no contexto educacional e como ela pode potencializar o aprendizado dos estudantes.', 'Prof. Maria Santos', NOW(), NOW()),
('Desenvolvimento Full Stack Moderno', 'O desenvolvimento full stack evoluiu significativamente nos últimos anos. Discutimos as principais tecnologias, frameworks e metodologias que todo desenvolvedor deve conhecer em 2024.', 'Prof. João Oliveira', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Criação de índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_posts_author ON "Posts"("author");
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON "Posts"("createdAt");
CREATE INDEX IF NOT EXISTS idx_posts_title ON "Posts"("title");

-- Grant de permissões
GRANT ALL PRIVILEGES ON DATABASE postech_blog TO admin;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO admin;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO admin;