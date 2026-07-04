# ✈️ StudyPilot AI — Full-Stack Academic Orchestration Platform

StudyPilot AI is a precision-engineered learning assistant that transforms raw textbooks, research papers, and lecture materials into structured, interactive study workspaces using Retrieval-Augmented Generation (RAG).

## 🚀 System Features
- **Cognitive AI Chat Engine:** Ask precise doubts directly linked to your uploaded documentation context vectors.
- **AI Quiz Studio:** Generates interactive, multiple-choice testing components with dynamic answer-key evaluation logic.
- **Flashcards Room:** Converts dense paragraphs into sleek 3D flippable recall cards for active memory training.
- **Intel Summary Engine:** Compiles high-density abstracts and bulleted blueprint notes with a built-in `.txt` downloader.

## 🛠️ Tech Stack & Architecture
- **Frontend:** React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend:** FastAPI (Python), PyMuPDF (Fitz text extraction)
- **AI Orchestration:** Google Gen AI SDK (`gemini-2.5-flash`), Structured JSON Schema Modes

## 📦 Local Installation & Setup

### 1. Backend Configuration
```bash
cd backend
python -m venv venv
# Activate on Windows:
.\venv\Scripts\activate

pip install -r requirements.txt
# Set your AI credentials:
$env:GEMINI_API_KEY="your_actual_api_key"
python main.py
