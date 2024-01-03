FROM node:latest

WORKDIR /ar

WORKDIR app

ARG NODE_ENV

ENV NODE_ENV $NODE_ENV

COPY admin auth conf routes views app.mjs package*.json README.md $WORKDIR/

RUN ls $WORKDIR

ENV PORT 3000

EXPOSE $PORT

CMD [ "npm", "start" ]
