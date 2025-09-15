FROM node:22-alpine AS node-pnpm

RUN npm i -g pnpm

# Stage 1
FROM node-pnpm AS build-stage

WORKDIR /frontend-app
# copy all from context (ussauly files checked out from repo; files/dirs in .dockerignore in context root are ignored) to workdir of build stage
COPY . .
# install packages on all projects of workspace (uses mainly pnpm-lock.yaml in root and package.json files in particular projects)
# creates node_modules
RUN pnpm install

#ARG VITE_API_BASE_URL
#ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

ARG VITE_AUTH
ENV VITE_AUTH=${VITE_AUTH}

ARG VITE_AUTH_OFF_USERNAME
ENV VITE_AUTH_OFF_USERNAME=${VITE_AUTH_OFF_USERNAME}

ARG VITE_AUTH0_DOMAIN
ENV VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}

ARG VITE_AUTH0_CLIENT_ID
ENV VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID}

ARG VITE_AUTH0_AUDIENCE
ENV VITE_AUTH0_AUDIENCE=${VITE_AUTH0_AUDIENCE}

# run script "build" from project "frontend"
# creates dist
RUN pnpm --prefix frontend build

# Stage 2
FROM nginx:1.23.4-alpine

COPY --from=build-stage /frontend-app/frontend/dist /usr/share/nginx/html

# port na ktorom bezi nginx
EXPOSE ${NGINX_DOCKER_PORT} ${NGINX_DOCKER_PORT_HTTPS}

CMD nginx -g 'daemon off;'
