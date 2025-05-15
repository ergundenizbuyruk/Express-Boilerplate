FROM node:24-alpine as builder

WORKDIR /build

RUN apk add --no-cache openssl

COPY package*.json .
RUN npm install

COPY src/ src/
COPY prisma/ prisma/
COPY tsconfig.json tsconfig.json

RUN npx prisma generate

RUN npm run build

FROM node:24-alpine as runner

RUN apk add --no-cache openssl

WORKDIR /app

COPY --from=builder build/package*.json .
COPY --from=builder build/node_modules node_modules
COPY --from=builder build/dist dist/

CMD [ "npm", "start" ]