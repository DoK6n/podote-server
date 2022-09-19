FROM node:16-slim AS builder

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN rm -rf node_modules
RUN npm install --silent

COPY . .

RUN npm run build

# remove development dependencies
# RUN npm prune --production

FROM node:16-slim

RUN apt-get update
RUN apt-get install -y openssl

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD [ "node", "dist/src/main" ]