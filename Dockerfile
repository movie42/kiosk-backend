FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.json tsconfig.build.json nest-cli.json ./
COPY ormconfig.json ./
COPY config ./config
COPY src ./src

RUN npm ci
RUN npm run build

CMD ["npm", "run" ,"start:dev"]