#!/usr/bin/env bash
set -o errexit
# exit on error
npm install

npm run build

# Gerar o cliente Prisma
# npx prisma generate
# npx prisma migrate dev

# Compilar TypeScript para JavaScript (se necessário)
# npm run build

echo "Construção finalizada com sucesso!"

