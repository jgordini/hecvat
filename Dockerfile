FROM nginx:alpine
COPY index.html /usr/share/nginx/html/
COPY main.js /usr/share/nginx/html/
COPY questions-data.js /usr/share/nginx/html/
RUN printf 'server {\n  listen 80;\n  root /usr/share/nginx/html;\n  index index.html;\n  gzip on;\n  gzip_types text/javascript application/javascript text/html;\n  add_header Cache-Control "no-cache, no-store, must-revalidate";\n  add_header Pragma "no-cache";\n  add_header Expires "0";\n}\n' > /etc/nginx/conf.d/default.conf
