FROM node:18-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm install --production

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/node_modules ./node_modules
COPY index.js .
ENV PORT=3000
EXPOSE 3000
CMD ["node", "index.js"]