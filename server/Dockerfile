# VaultWerk API — production image (Express + Mongoose, run with tsx).
FROM node:22-slim AS base
WORKDIR /app
ENV NODE_ENV=production

# Install all deps first (tsx runs the TS server directly; no build step).
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY server ./server
COPY src/lib/seeders/data ./src/lib/seeders/data
COPY src/lib/enums.ts ./src/lib/enums.ts

EXPOSE 4000
CMD ["npx", "tsx", "server/src/index.ts"]
