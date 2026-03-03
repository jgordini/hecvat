FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY main.js /usr/share/nginx/html/
COPY xlsx-data.js /usr/share/nginx/html/
COPY questions-data.js /usr/share/nginx/html/
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; gzip on; gzip_types text/javascript application/javascript text/html; }' > /etc/nginx/conf.d/default.conf
