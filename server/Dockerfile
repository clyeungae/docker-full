FROM node:18-alpine

WORKDIR /app
COPY ["./package.json", "./package-lock.json", "./"]
RUN npm install

COPY ./src /app
CMD ["node", "/app/index.js"]
