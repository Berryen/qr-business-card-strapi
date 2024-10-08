FROM node:18.19.0-alpine3.18 AS packages

ARG APP_NAME=gateway
ENV app_name=${APP_NAME}
RUN echo "-> $app_name"

COPY package.json /tmp/package.json
COPY yarn.lock /tmp/yarn.lock
RUN cd /tmp && yarn && yarn cache clean
RUN mkdir -p /usr/src/app/ && cp -a /tmp/node_modules /usr/src/app/node_modules
# --------------> The bundle image
# AKA copy all the file into a container
FROM node:18.19.0-alpine3.18 AS bundle

# RUN npm i -g npm@6.14.15
WORKDIR /usr/src/app
COPY ./ /usr/src/app/
COPY --from=packages /usr/src/app/node_modules /usr/src/app/node_modules
RUN yarn build

# --------------> The build image
FROM node:18.19.0-alpine3.18 AS build

WORKDIR /usr/src/app
COPY --from=bundle /usr/src/app/. /usr/src/app/

# --------------> The production image
FROM node:18.19.0-alpine3.18
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app /usr/src/app

EXPOSE 1337
CMD ["yarn", "start"]

# FROM alpine
# CMD ["echo", "Hello StackOverflow!"]