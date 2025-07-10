# 🥔 Potato Leaf Disease Detector

A full-stack web application that uses a Convolutional Neural Network (CNN) model to detect three types of potato leaf conditions: **Early Blight**, **Late Blight**, and **Healthy**. This tool helps farmers and agriculture experts diagnose potato crop diseases by uploading a leaf image.

---

## 📸 Demo

[![Uploading image.png…]()
](https://drive.google.com/file/d/1wj3kjB436cyMHLzXhxgmPfFFBPD0hj1h/view?usp=sharing)
---

## 🧠 Tech Stack

### Frontend

* **React.js**: Built with functional components.
* **Material-UI**: Used for beautiful UI components.
* **Axios**: For API calls.

### Backend

* **FastAPI**: Lightweight and high-performance Python API.
* **Uvicorn**: ASGI server.
* **TensorFlow/Keras**: For loading and running the trained deep learning model.

### Machine Learning

* **Model**: A Convolutional Neural Network (CNN) trained using PlantVillage dataset.
* **Frameworks**: TensorFlow, Keras
* **Dataset**: Potato leaf images categorized into Early Blight, Late Blight, and Healthy.

---

## 📁 Project Structure

```
POTATO-DISEASE
│
├── api
│   ├── main.py                # FastAPI backend
│   ├── requirement.txt        # Python dependencies
│
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── home.js            # Main upload & prediction interface
│   │   ├── bg.png            # Background image
│   │   ├── leaf.png          # UI Leaf image
│
├── models
│   └── 1.h5                   # Trained CNN model
│
├── training
│   ├── training.ipynb        # Jupyter Notebook for training
│   └── PlantVillage          # Dataset folder
```

---

## 🚀 Setup Instructions

### 1️⃣ Backend (FastAPI)

```bash
cd api
python -m venv venv
venv\Scripts\activate      # On Windows
pip install -r requirement.txt
uvicorn main:app --reload
```

### 2️⃣ Frontend (React)

```bash
cd frontend
npm install
npm start
```

📌 Make sure to set the API URL in your `.env`:

```
REACT_APP_API_URL=http://localhost:8000/predict
```

---

## 🧪 API Endpoints

| Method | Endpoint   | Description                     |
| ------ | ---------- | ------------------------------- |
| GET    | `/ping`    | Health check route              |
| POST   | `/predict` | Upload image and get prediction |

---

## 📝 Future Improvements

* Add voice/image capture via mobile
* Export predictions to PDF/CSV
* Add multilingual support for farmers
* Improve model accuracy with more data

---

## 🙌 Acknowledgements

* [PlantVillage Dataset](https://www.kaggle.com/datasets/emmarex/plantdisease)
* TensorFlow + FastAPI community

---

## 📌 Author

**Sanchit Pandey** – B.Tech CSE (AI & ML)

> Built as part of an effort to assist farmers with expert-level crop disease diagnosis on demand.
