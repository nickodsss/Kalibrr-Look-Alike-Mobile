FROM node:latest

ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

COPY . .

CMD ["npx", "nodemon", "app.js"]
