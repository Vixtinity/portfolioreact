FROM node:20-alpine
RUN apk add --no-cache bash
RUN npm install -g serve
WORKDIR /portfolo
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]