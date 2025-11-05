FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY html/ ./
# Optional: Configure Nginx default config if needed
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]