FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

# 런타임 환경변수 지정 (기본값 development)
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.env.${NODE_ENV} ./.env.${NODE_ENV}

CMD ["node", "dist/main"]

