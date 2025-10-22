import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Avatar,
  Chip,
  useTheme,
} from '@mui/material';
import {
  SmartToy,
  Person,
  Check,
  Close,
} from '@mui/icons-material';
import { Message, Product, Order } from '../../types';
import ProductCard from './ProductCard';
import OrderStatus from './OrderStatus';
import LoadingSpinner from '../Common/LoadingSpinner';

interface MessageBubbleProps {
  message: Message;
  onViewProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onViewProduct,
  onAddToCart,
}) => {
  const theme = useTheme();

  if (message.type === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 1 }}>
          <SmartToy />
        </Avatar>
        <Paper elevation={1} sx={{ p: 2, minWidth: 200 }}>
          <LoadingSpinner />
        </Paper>
      </Box>
    );
  }

  const isUser = message.sender === 'user';

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 3,
      }}
    >
      {/* Agent Avatar */}
      {!isUser && (
        <Avatar
          sx={{
            bgcolor: theme.palette.primary.main,
            mr: 1,
            width: 32,
            height: 32,
          }}
        >
          <SmartToy />
        </Avatar>
      )}

      <Box sx={{ maxWidth: '70%', minWidth: '200px' }}>
        {/* Sender Label */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            display: 'block',
            mb: 0.5,
            textAlign: isUser ? 'right' : 'left',
          }}
        >
          {isUser ? 'You' : 'PartSelect Assistant'}
        </Typography>

        {/* Message Content */}
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          {!isUser && (
            <Box sx={{ flexShrink: 0, mr: 1 }}>
              {/* Optional: Add typing indicator or status icons */}
            </Box>
          )}

          <Paper
            elevation={1}
            sx={{
              p: 2,
              backgroundColor: isUser
                ? theme.palette.primary.main
                : theme.palette.background.paper,
              color: isUser ? 'white' : theme.palette.text.primary,
              border: !isUser ? `1px solid ${theme.palette.divider}` : 'none',
              borderRadius: 2,
              position: 'relative',
              '&::after': isUser
                ? {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    right: -8,
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderBottom: `8px solid ${theme.palette.primary.main}`,
                    transform: 'rotate(270deg)',
                  }
                : {
                    content: '""',
                    position: 'absolute',
                    bottom: 8,
                    left: -8,
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderBottom: `8px solid ${theme.palette.background.paper}`,
                    transform: 'rotate(90deg)',
                  },
            }}
          >
            {/* Message Text */}
            <Typography
              variant="body1"
              sx={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                lineHeight: 1.5,
              }}
            >
              {message.content}
            </Typography>

            {/* Tool Results - Products */}
            {message.data && message.data[0]?.result?.products && (
              <Box sx={{ mt: 2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ mb: 1, fontWeight: 600 }}
                >
                  Found Products:
                </Typography>
                {message.data[0].result.products.map((product: Product) => (
                  <Box key={product.id} sx={{ mb: 2 }}>
                    <ProductCard
                      product={product}
                      onViewDetails={onViewProduct}
                      onAddToCart={onAddToCart}
                    />
                  </Box>
                ))}
              </Box>
            )}

            {/* Tool Results - Order */}
            {message.data && message.data[0]?.result?.order && (
              <Box sx={{ mt: 2 }}>
                <OrderStatus order={message.data[0].result.order} />
              </Box>
            )}

            {/* Compatibility Result */}
            {message.data && message.data[0]?.result?.compatible !== undefined && (
              <Box sx={{ mt: 2 }}>
                <Chip
                  icon={
                    message.data[0].result.compatible ? (
                      <Check color="success" />
                    ) : (
                      <Close color="error" />
                    )
                  }
                  label={
                    message.data[0].result.compatible
                      ? 'Compatible'
                      : 'Not Compatible'
                  }
                  color={
                    message.data[0].result.compatible ? 'success' : 'error'
                  }
                  variant="filled"
                  sx={{ mt: 1 }}
                />
                {message.data[0].result.alternatives &&
                  message.data[0].result.alternatives.length > 0 && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Alternatives:</strong>{' '}
                      {message.data[0].result.alternatives
                        .map((alt: Product) => alt.name)
                        .join(', ')}
                    </Typography>
                  )}
              </Box>
            )}

            {/* Timestamp */}
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 1,
                opacity: 0.7,
                textAlign: 'right',
              }}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </Paper>

          {/* User Avatar */}
          {isUser && (
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                ml: 1,
                width: 32,
                height: 32,
              }}
            >
              <Person />
            </Avatar>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default MessageBubble;