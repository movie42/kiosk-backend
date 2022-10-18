FROM node:16.14.2

WORKDIR /App

COPY package.json package-lock.json tsconfig.json tsconfig.build.json nest-cli.json ormconfig.json ./
COPY config ./config
COPY src ./src

RUN npm ci
RUN npm run build

CMD ["npm" ,"start"]