FROM node:12-buster AS builder

WORKDIR app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig.json ./
COPY . ./
RUN npm run build

FROM node:12-buster-slim AS runner
ENV NODE_ENV=prod
WORKDIR /opt/app
COPY --from=builder /app/dist ./
COPY package.json ./
COPY package-lock.json ./
RUN npm ci --production

EXPOSE 3000
CMD ["node", "/opt/app/app.js"]
