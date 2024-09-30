# Usando uma imagem base oficial do Node.js (versão 18.20.4)
FROM node:18.20.4

# Definindo o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Gera os arquivos necessários do Prisma
RUN npx prisma generate

# Transpila o código TypeScript para JavaScript
RUN npm run build

# Definir a variável de ambiente da porta
ENV PORT=3001

# Expor a porta em que a aplicação vai rodar
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["node", "dist/server.js"]
