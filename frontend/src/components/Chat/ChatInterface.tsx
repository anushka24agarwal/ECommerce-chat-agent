import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Paper,
  TextField,
  IconButton,
  Container,
  Fab,
  Snackbar,
  Alert,
  Typography,
  Chip,
} from '@mui/material';
import {
  Send,
  KeyboardArrowUp,
  ShoppingCart,
} from '@mui/icons-material';
import { useChat } from '../../hooks/useChat';
import { Message, Product } from '../../types';
import MessageBubble from './MessageBubble';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';

const ChatInterface: React.FC = () => {
  const { messages, isLoading, error, sendMessage, clearMessages } = useChat();
  const [input, setInput] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Show/hide scroll to top button
  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setShowScrollTop(scrollTop < scrollHeight - clientHeight - 100);
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    await sendMessage(input);
    setInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleViewProduct = (product: Product) => {
    // TODO: Implement product detail view
    console.log('View product:', product);
    // Could open a modal or navigate to product page
  };

  const handleAddToCart = (product: Product) => {
    // TODO: Implement add to cart functionality
    console.log('Add to cart:', product);
    // Could integrate with shopping cart context
  };

  const scrollToTop = () => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <Header onClearChat={clearMessages} messageCount={messages.length} />

      {/* Messages Container */}
      <Box
        ref={containerRef}
        onScroll={handleScroll}
        sx={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'background.default',
          position: 'relative',
        }}
      >
        <Container maxWidth="md" sx={{ py: 3 }}>
          {/* Welcome Message */}
          {messages.length === 0 && (
            <Box
              sx={{
                textAlign: 'center',
                py: 8,
                color: 'text.secondary',
              }}
            >
              <ShoppingCart sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
              <Typography variant="h5" gutterBottom>
                Welcome to PartSelect Assistant
              </Typography>
              <Typography variant="body1">
                I specialize in refrigerator and dishwasher parts. How can I help you today?
              </Typography>
              <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1, maxWidth: 400, margin: '0 auto' }}>
                <Typography variant="body2" color="text.secondary">
                  Try asking me about:
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Chip 
                    label="How to install part PS11752778" 
                    variant="outlined"
                    onClick={() => setInput("How to install part PS11752778")}
                    clickable
                  />
                  <Chip 
                    label="Is this compatible with my WDT780SAEM1?" 
                    variant="outlined"
                    onClick={() => setInput("Is this compatible with my WDT780SAEM1?")}
                    clickable
                  />
                  <Chip 
                    label="My ice maker isn't working" 
                    variant="outlined"
                    onClick={() => setInput("My ice maker isn't working")}
                    clickable
                  />
                </Box>
              </Box>
            </Box>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onViewProduct={handleViewProduct}
              onAddToCart={handleAddToCart}
            />
          ))}
          
          <div ref={messagesEndRef} />
        </Container>

        {/* Scroll to Top FAB */}
        {showScrollTop && (
          <Fab
            size="small"
            onClick={scrollToTop}
            sx={{
              position: 'absolute',
              bottom: 80,
              right: 24,
            }}
          >
            <KeyboardArrowUp />
          </Fab>
        )}
      </Box>

      {/* Input Area */}
      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
            <TextField
              fullWidth
              multiline
              maxRows={4}
              variant="outlined"
              placeholder="Ask about refrigerator or dishwasher parts, installation, compatibility..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: 'background.paper',
                },
              }}
            />
            <IconButton
              color="primary"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              sx={{
                height: 56,
                width: 56,
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'primary.dark',
                },
                '&:disabled': {
                  backgroundColor: 'action.disabled',
                },
              }}
            >
              <Send />
            </IconButton>
          </Box>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            Press Enter to send, Shift+Enter for new line
          </Typography>
        </Container>
      </Paper>

      {/* Error Snackbar */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => {}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="error" onClose={() => {}}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ChatInterface;