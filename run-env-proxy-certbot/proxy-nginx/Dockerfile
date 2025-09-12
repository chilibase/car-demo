FROM nginx:1.23.4-alpine

#COPY test-page.html /usr/share/nginx/html/

# port na ktorom bezi nginx
EXPOSE ${NGINX_PROXY_DOCKER_PORT} ${NGINX_PROXY_DOCKER_PORT_HTTPS}

CMD nginx -g 'daemon off;'
