FROM node:19

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

ENV DATABASE_URL="postgresql://root:root@host.docker.internal:5432/maintenance?schema=public"

EXPOSE 3333

CMD [ "npm", "run", "dev" ]