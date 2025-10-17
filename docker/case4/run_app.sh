#!/bin/sh

docker rm -f webapp redis-cache > /dev/null 2>&1
docker network rm aplikasi-net > /dev/null 2>&1

cat > requirements.txt <<EOD
flask
redis
EOD

cat > app.py <<EOD
from flask import Flask
from redis import Redis

app = Flask(__name__)
redis = Redis(host='redis-cache', port=6379)

@app.route('/')
def hello():
    count = redis.incr('hits')
    return f'Jumlah Pengunjung: {count}'

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
EOD

docker network create aplikasi-net

docker container run \
    -dit \
    --name redis-cache \
    --network aplikasi-net \
    redis:7-alpine

docker container run \
    -dit \
    --name webapp \
    --network aplikasi-net \
    -p 5000:5000 \
    -w /app \
    -v $(pwd):/app \
    python:3.9-slim \
    sh -c "pip install -r requirements.txt && python app.py"

docker ps
EOF