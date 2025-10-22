import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  SmartToy,
  Refresh,
  ShoppingCart,
} from '@mui/icons-material';

interface HeaderProps {
  onClearChat: () => void;
  messageCount: number;
}

const Header: React.FC<HeaderProps> = ({ onClearChat, messageCount }) => {
  return (
    <AppBar 
      position="static" 
      elevation={2}
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Toolbar>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <SmartToy 
            sx={{ 
              mr: 2, 
              color: 'primary.main',
              fontSize: 32
            }} 
          />
          <Box>
            <Typography variant="h6" component="h1" fontWeight="600">
              PartSelect Assistant
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Specialized in Refrigerator & Dishwasher Parts
            </Typography>
          </Box>
        </Box>

        {/* Stats and Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Message Count */}
          <Chip
            label={`${messageCount} messages`}
            size="small"
            variant="outlined"
          />

          {/* Clear Chat */}
          <Tooltip title="Start new conversation">
            <IconButton 
              onClick={onClearChat}
              size="small"
              sx={{ 
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>

          {/* Shopping Cart */}
          <Tooltip title="View cart">
            <IconButton 
              size="small"
              sx={{ 
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <ShoppingCart />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;