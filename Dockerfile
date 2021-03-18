FROM node:12 as nodebuild
WORKDIR /work
RUN npm install

EXPOSE 3000
CMD [ "ts-node", "app.ts" ]