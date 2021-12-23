FROM nginx 
COPY ./dist/ /usr/share/nginx/html/  
COPY nginx.conf /etc/nginx/nginx.conf  
COPY ./cert /etc/nginx