import { useState, useCallback } from 'react';
import { Message, ChatResponse } from '../types';
import { chatAPI } from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Add loading message
    const loadingMessage: Message = {
      id: 'loading',
      content: '',
      sender: 'agent',
      timestamp: new Date(),
      type: 'loading',
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const response = await chatAPI.sendMessage(content, messages);
      
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== 'loading'));

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        sender: 'agent',
        timestamp: new Date(response.timestamp),
        type: 'text',
        data: response.data,
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (err) {
      // Remove loading message
      setMessages(prev => prev.filter(msg => msg.id !== 'loading'));
      
      setError('Failed to send message. Please try again.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'agent',
        timestamp: new Date(),
        type: 'text',
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};