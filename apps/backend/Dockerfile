FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . ./

EXPOSE 4000

RUN ls -alh

CMD [ "npm", "run", "serve" ]