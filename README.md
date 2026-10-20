# SmartFAQ AI Chatbot

An intelligent FAQ chatbot built with **Python, Flask, and Natural Language Processing (NLP)**. The chatbot understands user questions, finds the most relevant FAQ using **TF-IDF Vectorization** and **Cosine Similarity**, and returns the best matching response through a modern web interface.

---

## Features

- Interactive chatbot interface
- NLP-based question matching
- FAQ knowledge base stored in JSON
- TF-IDF Vectorization
- Cosine Similarity for answer matching
- Text preprocessing using NLTK
  - Lowercasing
  - Tokenization
  - Stopword Removal
  - Porter Stemming
- Voice input (Speech Recognition)
- Text-to-Speech responses
- Copy last chatbot response
- Chat history using Local Storage
- Send message with Enter key
- Typing indicator animation
- Toast notifications
- Responsive Glassmorphism UI

---

## Technologies Used

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)

### Backend

- Python
- Flask

### NLP & Machine Learning

- NLTK
- Scikit-learn
- TF-IDF Vectorizer
- Cosine Similarity

### Data Storage

- JSON

---

## How It Works

1. User enters a question.
2. The question is preprocessed:
   - Convert to lowercase
   - Remove punctuation
   - Tokenize text
   - Remove stopwords
   - Apply Porter Stemming
3. TF-IDF converts all FAQ questions into numerical vectors.
4. Cosine Similarity compares the user's question with every FAQ.
5. The chatbot returns the answer with the highest similarity score.
6. If no suitable match is found, a fallback response is displayed.

---

## Project Structure

```
CodeAlpha_FAQ_Chat_Bot/
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── script.js
│
├── templates/
│   └── index.html
│
├── faq_data.json
│
├── chatbot.py
├── app.py
├── requirements.txt
├── LICENSE
├── README.md
├── .gitignore
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Aamnah-Basharat/CodeAlpha_FAQ_Chat_Bot
.git
```

### 2. Open the project

```bash
cd CodeAlpha_FAQ_Chat_Bot
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

#### Windows

```bash
venv\Scripts\activate
```

#### macOS/Linux

```bash
source venv/bin/activate
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Download the required NLTK resources

```bash
python
```

```python
import nltk

nltk.download("punkt")
nltk.download("punkt_tab")
nltk.download("stopwords")

exit()
```

### 7. Run the application

```bash
python app.py
```

Open your browser and visit:

```
http://127.0.0.1:5000
```

---

---

## Example Questions

Try asking:

- What is your name?
- How can I reset my password?
- Refund policy
- How do I contact support?
- Register account
- Working hours
- Where are you located?
- Customer service
- Recover my account

---

## License

This project is licensed under the MIT License.

---
Built with ❤️ by Shreyansh Singh
