FROM node:alpine
RUN mkdir -p /usr/src/app
WORKDIR ./
RUN npm install -g nodemon
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "start"]