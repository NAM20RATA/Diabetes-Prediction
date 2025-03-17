from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVC

app = Flask(__name__)
CORS(app)

# Load the model data and prepare it (using local CSV file)
columns = ['Pregnancies', 'Glucose', 'BloodPressure', 'SkinThickness', 'Insulin', 'BMI', 'DiabetesPedigreeFunction', 'Age', 'Outcome']
data = pd.read_csv('diabetes.csv', names=columns, header=None)

# Ensure all columns are numeric and handle any conversion errors
for col in columns:
    data[col] = pd.to_numeric(data[col], errors='coerce')

# Drop any rows with NaN values that couldn't be converted to numeric
data.dropna(inplace=True)

# Split data into features (X) and target (y)
X = data.drop('Outcome', axis=1)
y = data['Outcome']

# Feature scaling
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Train the model (Support Vector Machine)
model = SVC(kernel='linear', probability=True, random_state=42)
model.fit(X_scaled, y)

@app.route('/')
def home():
    # Serve the index.html page
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Get the input data from the request
    data = request.get_json()

    # Extract features from input JSON
    features = np.array([
        data['pregnancies'],
        data['glucose'],
        data['bloodPressure'],
        data['skinThickness'],
        data['insulin'],
        data['bmi'],
        data['pedigree'],
        data['age']
    ]).reshape(1, -1)

    # Apply scaling to the input features
    features_scaled = scaler.transform(features)

    # Make a prediction
    prediction = model.predict(features_scaled)

    # Return the prediction as JSON
    result = {
        'prediction': 'Diabetic' if prediction[0] == 1 else 'Non-diabetic'
    }

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
