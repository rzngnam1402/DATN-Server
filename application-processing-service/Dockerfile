FROM node:20-alpine

WORKDIR /usr/src/application-processing-service

COPY --chown=node:node package*.json ./

RUN npm i

COPY --chown=node:node . .

RUN chown -R node:node /usr/src/application-processing-service
USER node

RUN npx prisma generate

CMD [ "npm", "run", "start:dev" ]
