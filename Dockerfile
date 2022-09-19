FROM node:16-alpine AS builder

WORKDIR /usr/src/app

COPY package* ./

RUN rm -rf node_modules
RUN npm install --silent

COPY . .

RUN npm run build

# remove development dependencies
RUN npm prune --production

FROM node:16-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./package.json

EXPOSE 3001

CMD [ "node", "dist/main.js" ]
# CMD [ "npm", "run", "start:prod" ]
