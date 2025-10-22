import React from 'react';
import { Box, Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "PartSelect Assistant is thinking..." 
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
      }}
    >
      <CircularProgress size={20} />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;