FROM node:alpine
WORKDIR /app
COPY ./package*.json /app
COPY ./ /app
RUN npm i
CMD ["npm", "run", "start"]
