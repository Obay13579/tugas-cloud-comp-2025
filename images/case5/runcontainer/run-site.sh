#!/bin/sh
docker rm -f docs-static || true
docker run -d --name docs-static -p 8080:80 docs-static:1.0