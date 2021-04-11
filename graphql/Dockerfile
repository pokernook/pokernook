FROM node:15.14.0-alpine
WORKDIR /app
COPY package*.json ./
COPY prisma prisma
COPY src src
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]
