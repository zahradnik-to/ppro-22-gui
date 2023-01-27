FROM node:16-alpine
WORKDIR /frontend
COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["npm", "start"]