import torch
import torchvision.transforms as tt
import io
from torch.utils.data.dataloader import DataLoader
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
from flask.helpers import send_from_directory
from PIL import Image
from pokemon_dataset import POKEMON, POKEMON_NAME_TO_NUMBER
from resnet9 import ResNet9
from torch.utils.data.dataloader import DataLoader


app = Flask(__name__, static_folder='client/dist', static_url_path='')
cors = CORS(app)

# Precomputed normalization statistics
test_mean = torch.tensor([0.6055, 0.5916, 0.5546])
test_std = torch.tensor([0.2221, 0.2112, 0.2234])
test_stats = (test_mean.tolist(), test_std.tolist())

def run_script(image_bytes, model_path):
    image_tensor = image_to_tensor(image_bytes)
    model = load_model(model_path)
    prediction = predict_image(image_tensor, model)
    return prediction

def image_to_tensor(image_bytes):
    image_resize = (128, 128) 
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image_tfms = tt.Compose([tt.Resize(image_resize), tt.ToTensor(), tt.Normalize(*test_stats)]) # FIX CONVERSION
    tensor = image_tfms(image)
    return tensor                    

def load_model(model_path):
    model = ResNet9(3, 151)
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model       

def predict_image(img, model):
    xb = img.unsqueeze(0)
    yb = model(xb)
    _, preds = torch.max(yb, dim=1)
    return preds[0].item()

# UNUSED GET FUNCTION
@app.route("/api/prediction", methods=['GET'])
def prediction():
    return jsonify (
        {}
    )

@app.route("/api/upload", methods=['POST'])
@cross_origin()
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image_bytes = file.read()
        model_path = 'Model85_state_dict.pth'
        prediction_index = run_script(image_bytes, model_path)
        prediction = POKEMON[prediction_index]
        pokedex_number = POKEMON_NAME_TO_NUMBER[prediction]
        return jsonify({'prediction': prediction, 'number': pokedex_number})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == "__main__":
    app.run(debug=True, port=8080)


