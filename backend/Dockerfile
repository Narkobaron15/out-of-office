# latest node
FROM node:latest

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm i --force

# Bundle app source
COPY . .

ENV PORT=8080
ENV NODE_ENV=production
ENV LOG_LEVEL=info
ENV SESSION_DRIVER=cookie
ENV TZ=UTC

EXPOSE 8080

CMD [ "node", "ace", "serve" ]
