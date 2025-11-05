from flask import Flask, request, jsonify
import json, os

app = Flask(__name__)
DATA_FILE = '/app/feedback.json'

@app.route('/api/feedback', methods=['POST'])
def feedback():
    data = request.get_json()
    if os.path.exists(DATA_FILE):
        lst = json.load(open(DATA_FILE))
    else:
        lst = []
    lst.append(data)
    with open(DATA_FILE, 'w') as f:
        json.dump(lst, f)
    return jsonify({"status":"ok"}), 201

@app.route('/api/feedback', methods=['GET'])
def get_feedback():
    if os.path.exists(DATA_FILE):
        return jsonify(json.load(open(DATA_FILE)))
    else:
        return jsonify([])
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
