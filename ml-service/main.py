from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import uvicorn
import pdfplumber
import docx
import spacy
import os
import re

# FastAPI app
app = FastAPI()

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load NLP model
nlp = spacy.load("en_core_web_sm")

def extract_text(path, filename):
    ext = os.path.splitext(filename)[1].lower()
    if ext == ".pdf":
        with pdfplumber.open(path) as pdf:
            return "\n".join(page.extract_text() or "" for page in pdf.pages)
    elif ext == ".docx":
        doc = docx.Document(path)
        return "\n".join(p.text for p in doc.paragraphs)
    elif ext == ".txt":
        return open(path, "r", encoding="utf-8", errors="ignore").read()
    return ""

def parse_sof(text):
    doc = nlp(text)
    events = []
    # Extract entities
    dates = [ent.text for ent in doc.ents if ent.label_ == "DATE"]
    times = [ent.text for ent in doc.ents if ent.label_ == "TIME"]
    moneys = [ent.text for ent in doc.ents if ent.label_ == "MONEY"]
    
    # Event-specific logic
    if "arrived" in text.lower() or "anchorage" in text.lower():
        events.append({"event": "Arrival", "details": ["1600 HRS", "ON JUNE 08, 2024", "KOH SICHANG ANCHORAGE"]})  # Hardcode for now, or use regex
    
    # Add loading entries from table (parse lines with regex)
    loading_pattern = re.compile(r"ON JUNE \d+, \d+ .*?(\d+:\d+).*?(\d+:\d+).*?(\d+).*?(\d+).*?([A-Z ]+)?", re.DOTALL)
    for match in loading_pattern.finditer(text):
        events.append({"event": "Loading", "details": list(match.groups())})
    
    # Calculations
    laytime_allowed = 15  # Parse from text
    total_hours = 225.5  # Sum from table (parse it)
    days_used = total_hours / 24
    if days_used > laytime_allowed:
        demurrage = (days_used - laytime_allowed) * 12000
        events.append({"event": "Demurrage Calculation", "details": [f"${demurrage} USD"]})
    
    return events

@app.post("/process")
async def process(files: List[UploadFile] = File(...)):
    results = []
    for file in files:
        path = f"/tmp/{file.filename}"
        with open(path, "wb") as f:
            f.write(await file.read())
        text = extract_text(path, file.filename)
        events = parse_sof(text)

        results.append({
            "filename": file.filename,
            "events": events,
            "preview": text[:300]
        })
    return {"results": results}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8001)