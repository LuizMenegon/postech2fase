# Dockerfile para o Backend Node.js
FROM node:18-alpine

# Define o diretório de trabalho
WORKDIR /app

# Instala dependências do sistema
RUN apk add --no-cache postgresql-client wget

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production

# Copia o código fonte
COPY . .

# Expõe a porta da aplicação
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

# Comando para iniciar a aplicação
CMD ["npm", "start"]