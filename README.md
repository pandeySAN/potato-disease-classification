# 🥔 Potato Disease Detection using Deep Learning

A full-stack application for detecting potato leaf diseases using a Convolutional Neural Network model served via FastAPI backend and a (to be built) React frontend.

---

## 📁 Project Structure

```
potato-disease/
│
├── api/                    # FastAPI backend
│   ├── main.py             # API to handle prediction requests
│   ├── main-tf-serving.py  # Alternative TensorFlow Serving API (if needed)
│   ├── requirement.txt     # Backend dependencies
│
├── models/
│   └── 1.h5                # Trained Keras model
│
├── training/
│   ├── PlantVillage/       # Dataset directory
│   └── training.ipynb      # Jupyter Notebook for training
│
├── frontend/               # Frontend (to be developed)
│
├── model.config            # Model config (if using TF Serving)
└── .venv/                  # Virtual environment
```

---

## 🚀 How to Run the Project

### 🧠 Prerequisites

* Python 3.10+
* Node.js 18+ (for frontend)
* `virtualenv` or `venv` for isolated environment

---

### 🔧 Backend Setup (FastAPI)

```bash
# 1. Navigate to API directory
cd api

# 2. Activate virtual environment
# Windows
.\.venv\Scripts\activate
# Unix/macOS
source .venv/bin/activate

# 3. Install dependencies
pip install -r requirement.txt

# 4. Run the FastAPI server
python main.py
```

📍 Visit `http://localhost:8000/docs` to open the Swagger UI for testing.

---

## 📤 API Endpoints

| Method | Endpoint   | Description                     |
| ------ | ---------- | ------------------------------- |
| GET    | `/ping`    | Check if API is alive           |
| POST   | `/predict` | Upload image and get prediction |

**POST /predict**

* **Request:** multipart/form-data

  * `file`: image file (.jpg/.png)
* **Response:**

```json
{
  "class": "Early Blight",
  "confidence": 0.9873
}
```

---

### 🖼 Sample Model Info

* Format: `.h5` (Keras)
* Classes: `Early Blight`, `Late Blight`, `Healthy`
* Input shape: 256x256 RGB image

---

### 🎯 Frontend Setup (React - Vite)

If you haven’t created the frontend yet:

```bash
cd frontend
npm create vite@latest
# Choose React + JavaScript
cd your-project-name
npm install
npm run dev
```

Make POST requests to `http://localhost:8000/predict`.

---

### 🧪 Model Training (Jupyter)

* Navigate to `training/training.ipynb` to see the data preprocessing, model training, and evaluation steps using the **PlantVillage** dataset.

---

## 📦 Dependencies

Backend (FastAPI):

* `fastapi`
* `uvicorn`
* `pillow`
* `tensorflow`
* `keras`
* `numpy`

Frontend (if React):

* `vite`
* `react`
* `axios` (for API calls)

---

## 🏁 Future Improvements

* ✅ Add frontend image upload and display result
* ⏳ Dockerize backend and frontend
* ⏳ Deploy to cloud (Render, Vercel, etc.)

---

## 👨‍🔬 Author

**Sanchit Pandey**
Built with ❤️ for real-world ML problem-solving.

---
