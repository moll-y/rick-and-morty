FROM node:18-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npx", "ts-node", "-r", "tsconfig-paths/register", "src/main.ts"]
