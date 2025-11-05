#!/bin/sh
# start support process for feedback API (Flask app) in background
nohup python3 -u feedback_api.py &
# start nginx in foreground
nginx -g "daemon off;"