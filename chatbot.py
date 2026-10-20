import json
import string
from nltk.stem import PorterStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# ------------------------
# Load FAQ
# ------------------------
def load_faq():
    with open("faq_data.json", "r") as file:
        return json.load(file)

# ------------------------
# Text Preprocessing
# ------------------------
def preprocess_text(text):
    text = text.lower()
    text = text.translate(
        str.maketrans("", "", string.punctuation)
    )
    tokens = word_tokenize(text)
    stop_words = set(stopwords.words("english"))
    stemmer = PorterStemmer()

    filtered = [
    stemmer.stem(word)
    for word in tokens
    if word not in stop_words
]
    return " ".join(filtered)

# ------------------------
# Find Best Answer
# ------------------------
def get_answer(user_question):
    faq = load_faq()
    questions = [
        preprocess_text(item["question"])
        for item in faq
    ]
    vectorizer = TfidfVectorizer()
    question_vectors = vectorizer.fit_transform(questions)
    user_vector = vectorizer.transform(
        [preprocess_text(user_question)]
    )
    similarity = cosine_similarity(
        user_vector,
        question_vectors
    )
    best_match = similarity.argmax()
    confidence = similarity[0][best_match]
    if confidence < 0.20:
        return "Sorry, I couldn't find a suitable answer."
    return faq[best_match]["answer"]