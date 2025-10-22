import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './styles/theme';
import ChatInterface from './components/Chat/ChatInterface';
import ErrorBoundary from './components/Common/ErrorBoundary';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ErrorBoundary>
        <ChatInterface />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

export default App;