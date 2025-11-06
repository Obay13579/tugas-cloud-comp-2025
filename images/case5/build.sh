#!/bin/bash

docker build \
    -t mygoserver:1.0 \
    -f platform/Dockerfile \
    .