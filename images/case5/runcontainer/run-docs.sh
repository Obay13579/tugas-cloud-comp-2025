#!/bin/sh
docker rm -f docsportal || true
docker run -d --name docsportal -p 8080:80 docsportal:1.0