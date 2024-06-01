FROM node:20-alpine

WORKDIR /usr/src/api-gateway

COPY --chown=node:node package*.json ./

RUN npm i

COPY --chown=node:node . .

RUN chown -R node:node /usr/src/api-gateway
USER node

EXPOSE 3333

CMD [ "npm", "run", "start:dev" ]
