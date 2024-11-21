FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
EXPOSE 3001

RUN npm install -g serve json-server

CMD ["sh", "-c", "json-server --watch db.json --port 3001 & serve -s build -l 3000"]
