# latest node
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

ENV PORT=$PORT
ENV HOST=$HOST
ENV NODE_ENV=$NODE_ENV
ENV LOG_LEVEL=$LOG_LEVEL
ENV APP_KEY=$APP_KEY
ENV DB_HOST=$DB_HOST
ENV DB_PORT=$DB_PORT
ENV DB_DATABASE=$DB_DATABASE
ENV DB_USER=$DB_USER
ENV DB_PASSWORD=$DB_PASSWORD
ENV SESSION_DRIVER=$SESSION_DRIVER
ENV TZ=UTC

EXPOSE 3000

CMD [ "node", "ace", "serve" ]
