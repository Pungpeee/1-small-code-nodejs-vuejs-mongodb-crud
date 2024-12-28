# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install

# COPY ./ .
# RUN npm run build

FROM node:18-alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . .
COPY package*.json /usr/src/


RUN npm install --force

# start app
RUN npm run build
EXPOSE 3000

CMD npm start