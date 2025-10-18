# Memulai dari image Nginx resmi
FROM nginx:1.21-alpine

# Hapus konfigurasi default
RUN rm /etc/nginx/conf.d/default.conf

# Salin file konfigurasi reverse proxy kustom kita
COPY nginx.conf /etc/nginx/conf.d/