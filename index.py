import torch
from flask import Flask, request, jsonify
import numpy as np

app = Flask(__name__)
model = None

def load_model():
    global model
    model = torch.load("data/decision_tree_model.pt")

@app.route('/', methods=['POST'])
def predict():
    global model
    if model is None:
        load_model()
    
    data = request.get_json(force=True)
    
    if 'input_data' not in data:
        return jsonify({'error': 'No input data provided'}), 400

    input_data = np.array(data['input_data'])
    input_data = torch.tensor(input_data, dtype=torch.float32)
    input_data = input_data.unsqueeze(0)  # Add batch dimension

    with torch.no_grad():
        output = model.predict(input_data)

    return jsonify({'prediction': output.item()}), 200


if __name__ == '__main__':
    load_model()
    app.run(debug=True,port=6969)