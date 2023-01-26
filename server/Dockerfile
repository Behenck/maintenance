FROM node:19

WORKDIR /usr/src/app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY . .

RUN npm install

ENV DATABASE_URL="postgresql://root:root@intranet.santacasa.com.br:5432/maintenance?schema=public"

RUN npx prisma migrate dev

RUN npm run dev:createDepartments

EXPOSE 3333

CMD [ "npm", "run", "dev" ]