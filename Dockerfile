FROM node:18.18.0-alpine as build

RUN mkdir -p /app
WORKDIR /app

COPY . .
RUN npm ci && npm cache clean --force
RUN npm run build

FROM node:18.18.0-alpine

WORKDIR /app

COPY --from=build /app/.output ./.output

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
