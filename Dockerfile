FROM node:18.19

ARG API_BASE_URL
ARG BASE_URL

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80
ENV API_BASE_URL $API_BASE_URL
ENV BASE_URL $BASE_URL

WORKDIR /usr/src/app

# install app dependencies
COPY package*.json ./
RUN yarn install

# add app
COPY ./ ./

RUN node_modules/nuxt/bin/nuxt.mjs build

EXPOSE 80

# start app
CMD node .output/server/index.mjs
