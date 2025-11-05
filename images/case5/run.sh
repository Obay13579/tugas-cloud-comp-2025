#!/bin/bash
docker build -t bookmark-server .
docker run -d -p 8080:80 --name bookmark-server bookmark-server