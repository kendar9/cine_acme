#!/bin/bash

echo "Configurando variables de entorno en Vercel..."
echo ""

# Leer las variables del archivo .env
source .env

echo "Configurando MONGO_URI..."
vercel env add MONGO_URI production <<< "$MONGO_URI"

echo "Configurando DB_NAME..."
vercel env add DB_NAME production <<< "$DB_NAME"

echo "Configurando JWT_SECRET..."
vercel env add JWT_SECRET production <<< "$JWT_SECRET"

echo "Configurando BCRYPT_SALT_ROUNDS..."
vercel env add BCRYPT_SALT_ROUNDS production <<< "$BCRYPT_SALT_ROUNDS"

echo "Configurando NODE_ENV..."
vercel env add NODE_ENV production <<< "production"

echo ""
echo "Variables de entorno configuradas. Redesplegando..."
vercel --prod