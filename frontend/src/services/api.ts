import axios from 'axios';
import { ChatResponse } from '../types';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatAPI = {
  sendMessage: async (message: string, conversationHistory: any[] = []): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>('/chat/message', {
      message,
      conversationHistory,
    });
    return response.data;
  },
};

export default api;