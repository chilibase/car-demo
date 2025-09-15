FROM node:22-alpine AS node-pnpm

RUN npm i -g pnpm

FROM node-pnpm AS build

WORKDIR /backend-app
COPY . .
RUN pnpm install
# build dist in common
RUN pnpm --prefix common tsc -b
# run script "build" from project "backend"
# build dist in backend
RUN pnpm --prefix backend tsc -b
# removes devDependencies from node_modules (across all projects)
RUN pnpm prune --prod

FROM node-pnpm AS deploy

WORKDIR /backend-app
COPY --from=build /backend-app/common/package.json ./common/package.json
COPY --from=build /backend-app/common/node_modules ./common/node_modules
COPY --from=build /backend-app/common/dist ./common/dist
COPY --from=build /backend-app/backend/package.json ./backend/package.json
COPY --from=build /backend-app/backend/node_modules ./backend/node_modules
COPY --from=build /backend-app/backend/dist ./backend/dist
# adresarova struktura pre uploading suborov (skor specificke pre danu app-ku)
RUN mkdir -p /backend-app/backend/app-files/uploaded
RUN mkdir -p /backend-app/backend/app-files/x-files

# na backend sa pripajame z frontend containera, netreba nam tento EXPOSE
# 3.6.2024 z proxy sa pripajame na backend cez tento port
EXPOSE ${NODE_DOCKER_PORT}

CMD ["node", "backend/dist/main.js"]
