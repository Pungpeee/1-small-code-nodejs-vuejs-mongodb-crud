
FROM node:18-alpine


WORKDIR /usr/src/app


COPY package*.json ./

# Install dependencies
RUN npm install --frozen-lockfile


COPY . .

EXPOSE 3000


CMD ["npm", "build"]
