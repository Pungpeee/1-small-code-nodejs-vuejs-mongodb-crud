FROM node:18-alpine

RUN mkdir -p /usr/src
WORKDIR /usr/src

COPY . .

RUN npm install --frozen-lockfile


RUN npm run build
EXPOSE 3000

CMD ["npm", "build"]