
# Spam Mail Detection

A machine learning web application that classifies email messages as **Spam** or **Ham (Not Spam)**.

The project uses a TF-IDF vectorizer and a Logistic Regression model for text classification. A Flask API connects the trained model with a React frontend, allowing users to enter a message and get an instant prediction.

## Tech Stack

- React.js
- Vite
- Python
- Flask
- Flask-CORS
- Scikit-learn
- TF-IDF Vectorization
- Logistic Regression

## Features

- Spam and ham email classification
- Real-time prediction through a web interface
- REST API built with Flask
- React-based responsive frontend
- Saved trained model and vectorizer for prediction

## Project Structure

```text
Spam-Mail-detection/
├── app.py
├── model.pkl
├── vectorizer.pkl
├── requirements.txt
└── frontend/
    ├── package.json
    └── src/
        ├── App.jsx
        ├── App.css
        └── main.jsx
````

## How It Works

```text
User Message
     ↓
React Frontend
     ↓
Flask API
     ↓
TF-IDF Vectorizer
     ↓
Logistic Regression Model
     ↓
Spam / Ham Prediction
```

## Run Locally

### Backend

```bash
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Backend runs at:

```text
http://127.0.0.1:5000
```

### Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

## Example

**Spam:**

```text
Congratulations! You have won a FREE iPhone. Click the link now to claim your prize!
```

**Ham:**

```text
Hey, are we meeting tomorrow at 10 AM?
```




