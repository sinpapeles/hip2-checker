# Dockerfile
FROM node:lts

WORKDIR /app

COPY . .

RUN yarn install
RUN yarn build

# Expose the port your app runs on
EXPOSE 3000

# Env variables
ENV PORT=3000
ENV DNS=103.196.38.38,103.196.38.39

CMD cd dist && node server.js
