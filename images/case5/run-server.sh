#!/bin/bash

docker rm -f mygoserver

docker run -dit \
	--name mygoserver \
	-p 8080:8080 \
	mygoserver:1.0
