FROM php:8.2-apache

COPY html/ /var/www/html/

# Hak akses agar bookmark bisa disimpan
RUN chown -R www-data:www-data /var/www/html/

EXPOSE 80
