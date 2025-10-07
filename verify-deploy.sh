#!/bin/bash

# Script de verificação pós-deploy
echo "🔍 Verificando se a aplicação está funcionando..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para verificar serviço
check_service() {
    local url=$1
    local name=$2
    
    echo -n "Verificando $name... "
    
    if curl -s -f "$url" > /dev/null; then
        echo -e "${GREEN}✅ OK${NC}"
        return 0
    else
        echo -e "${RED}❌ ERRO${NC}"
        return 1
    fi
}

# Aguardar containers iniciarem
echo "⏳ Aguardando containers iniciarem (30s)..."
sleep 30

# Verificar serviços
echo -e "\n📊 Status dos Serviços:"
check_service "http://localhost:3001/health" "Backend API"
check_service "http://localhost:3000" "Frontend React"

# Verificar containers
echo -e "\n🐳 Status dos Containers:"
docker-compose ps

# Verificar logs se houver erro
if ! check_service "http://localhost:3001/health" "Backend" > /dev/null; then
    echo -e "\n${RED}🚨 Logs do Backend:${NC}"
    docker-compose logs --tail=20 backend
fi

if ! check_service "http://localhost:3000" "Frontend" > /dev/null; then
    echo -e "\n${RED}🚨 Logs do Frontend:${NC}"
    docker-compose logs --tail=20 frontend
fi

echo -e "\n🎉 Verificação concluída!"
echo -e "📱 Acesse: ${YELLOW}http://localhost:3000${NC}"
echo -e "🔌 API: ${YELLOW}http://localhost:3001${NC}"