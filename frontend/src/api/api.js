import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chat = async (message) => {
  const response = await apiClient.post('/api/chat', { message });
  return response.data;
};

export const uploadPDF = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await apiClient.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });
  return response.data;
};

export const generateQuiz = async (topic) => {
  const response = await apiClient.post('/quiz', { topic });
  return response.data;
};

export const generateFlashcards = async (topic) => {
  const response = await apiClient.post('/flashcards', { topic });
  return response.data;
};

export const generateSummary = async (topic) => {
  const response = await apiClient.post('/summary', { topic });
  return response.data;
};