import os
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import fitz  # PyMuPDF
from google import genai

app = FastAPI(title="StudyPilot Live AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "./uploaded_vault"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Initialize the official Google GenAI Client
# NOTE: Replace the string below with your actual API key from Google AI Studio
# Reads the key from your computer's hidden environment variables
GEMINI_KEY = os.environ.get("GEMINI_API_KEY")
ai_client = genai.Client(api_key=GEMINI_KEY)

class TopicRequest(BaseModel):
    topic: str

class ChatRequest(BaseModel):
    message: str

def get_latest_pdf_content():
    if not os.path.exists(UPLOAD_DIR):
        return None
    files = [os.path.join(UPLOAD_DIR, f) for f in os.listdir(UPLOAD_DIR) if f.lower().endswith('.pdf')]
    if not files:
        return None
    
    latest_file = max(files, key=os.path.getmtime)
    filename = os.path.basename(latest_file)
    
    try:
        text = ""
        with fitz.open(latest_file) as doc:
            # Gather text up to the first 6 pages to stay safely within context limits
            for page in doc.pages(0, min(6, len(doc))):
                text += page.get_text()
        return {"filename": filename, "text": text}
    except Exception:
        return None

# --- DYNAMIC AI PIPELINES ---

@app.post("/api/upload")
async def handle_upload(file: UploadFile = File(...)):
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid format.")
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    return {"status": "success", "filename": file.filename}

@app.post("/api/chat")
async def handle_chat(payload: ChatRequest):
    pdf_data = get_latest_pdf_content()
    
    # Construct an intelligent prompt combining document context and the user query
    if pdf_data and pdf_data["text"]:
        prompt = (
            f"You are StudyPilot AI, an expert tutor. You are analyzing the document '{pdf_data['filename']}'. "
            f"Here is the context of the document:\n###\n{pdf_data['text'][:6000]}\n###\n\n"
            f"The user asks: {payload.message}\n"
            f"Answer the user's question accurately based on the document text provided above. Keep it educational and concise."
        )
    else:
        prompt = f"You are StudyPilot AI, an expert academic assistant. Answer the user's question thoroughly: {payload.message}"

    try:
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return {"reply": response.text}
    except Exception as e:
        return {"reply": f"AI inference error: {str(e)}. Check your API key."}

@app.post("/quiz")
async def generate_quiz(payload: TopicRequest):
    pdf_data = get_latest_pdf_content()
    context_source = pdf_data["text"][:5000] if pdf_data else f"General knowledge topic: {payload.topic}"
    
    prompt = (
        f"Generate a multiple-choice quiz about {payload.topic}. "
        f"Use this text source data for context if relevant:\n{context_source}\n\n"
        f"You MUST respond ONLY with a raw JSON array matching this exact format structure, with no extra text or markdown formatting:\n"
        f'[\n  {{"question": "Question text here?", "options": ["Opt1", "Opt2", "Opt3", "Opt4"], "answer": "Exact matching string copy of correct option value"}}\n]'
    )
    
    try:
        # Use structured json configuration settings
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config={'response_mime_type': 'application/json'}
        )
        import json
        return json.loads(response.text)
    except Exception:
        # Emergency backup fallback block in case schema returns invalid properties
        return [{"question": f"Error compiling dynamic model data. What defines {payload.topic}?", "options": ["Option A", "Option B", "Option C", "Option D"], "answer": "Option A"}]

@app.post("/flashcards")
async def generate_flashcards(payload: TopicRequest):
    pdf_data = get_latest_pdf_content()
    context_source = pdf_data["text"][:5000] if pdf_data else f"General knowledge topic: {payload.topic}"
    
    prompt = (
        f"Generate 3 flashcards for terms or definitions regarding {payload.topic}. "
        f"Source data reference:\n{context_source}\n\n"
        f"Respond ONLY with a raw JSON array matching this format structure, with no backticks or extra text:\n"
        f'[\n  {{"front": "Question/Concept text", "back": "Answer/Definition text"}}\n]'
    )
    
    try:
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
            config={'response_mime_type': 'application/json'}
        )
        import json
        return json.loads(response.text)
    except Exception:
        return [{"front": f"Failed to stream dynamic AI nodes for {payload.topic}", "back": "Check API logs."}]

@app.post("/summary")
async def generate_summary(payload: TopicRequest):
    pdf_data = get_latest_pdf_content()
    context_source = pdf_data["text"][:8000] if pdf_data else f"General knowledge topic: {payload.topic}"
    
    prompt = (
        f"Create an executive academic summary analyzing the key details of {payload.topic}. "
        f"Use this document text context if available:\n{context_source}\n\n"
        f"Structure your response with clear headers, bullet points, and high-density analysis takeaways."
    )
    
    try:
        response = ai_client.models.generate_content(
            model='gemini-2.5-flash',
            contents=prompt,
        )
        return {"summary": response.text}
    except Exception as e:
        return {"summary": f"Failed to compute abstract extraction. Engine log: {str(e)}"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)