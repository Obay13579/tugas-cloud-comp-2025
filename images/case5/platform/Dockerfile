FROM python:3.11-slim
WORKDIR /app
# Copy documentation markdown
COPY docs/ ./docs/
RUN pip install mkdocs mkdocs-material mkdocs-pdf-export-plugin
# Build static site
RUN mkdocs build --site-dir site/
# Install nginx
RUN apt-get update && apt-get install -y nginx && rm -rf /var/lib/apt/lists/*
# Remove default and copy our config
COPY nginx.conf /etc/nginx/sites-available/default
EXPOSE 80
# Copy entrypoint
COPY start.sh /start.sh
RUN chmod +x /start.sh
ENTRYPOINT ["/start.sh"]
