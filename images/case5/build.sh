#!/bin/bash

echo "Memulai build Case 5: Multi-Stage Build..."

docker build \
    -t mygoserver:1.0 \
    -f platform/Dockerfile \
    .

echo "Build selesai. Cek image dengan 'docker images mygoserver:1.0'"
echo "Bandingkan ukurannya dengan 'docker images golang:1.19-alpine' (jika ada)"