FROM node:12.6.0-alpine

WORKDIR /app
ADD . /app/

# global install & update
RUN npm install
RUN npm run build

ENV HOST 0.0.0.0
ENV NODE_ENV=production
EXPOSE 3000

# start command
CMD [ "npm", "start" ]