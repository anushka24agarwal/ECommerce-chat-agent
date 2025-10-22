import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import {
  LocalShipping,
  CheckCircle,
  Schedule,
  Cancel,
} from '@mui/icons-material';
import { Order } from '../../types';

interface OrderStatusProps {
  order: Order;
}

const OrderStatus: React.FC<OrderStatusProps> = ({ order }) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shipped':
        return <LocalShipping color="info" />;
      case 'delivered':
        return <CheckCircle color="success" />;
      case 'processing':
        return <Schedule color="warning" />;
      case 'cancelled':
        return <Cancel color="error" />;
      default:
        return <Schedule color="action" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shipped':
        return 'info';
      case 'delivered':
        return 'success';
      case 'processing':
        return 'warning';
      case 'cancelled':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Card sx={{ maxWidth: 400, mb: 2 }}>
      <CardContent>
        {/* Order Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Order #{order.orderNumber}
          </Typography>
          <Chip
            icon={getStatusIcon(order.status)}
            label={order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            color={getStatusColor(order.status) as any}
            variant="filled"
          />
        </Box>

        {/* Order Details */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Ordered: {new Date(order.orderDate).toLocaleDateString()}
          </Typography>
          {order.estimatedDelivery && (
            <Typography variant="body2" color="text.secondary">
              Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Items */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Items:
          </Typography>
          {order.items.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">
                {item.name}
              </Typography>
              <Typography variant="body2">
                ${item.price} x {item.quantity}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Total */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle2">Total:</Typography>
          <Typography variant="subtitle2" color="primary">
            ${order.total}
          </Typography>
        </Box>

        {/* Tracking */}
        {order.trackingNumber && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>Tracking:</strong> {order.trackingNumber}
            </Typography>
            {order.trackingUrl && (
              <Button
                variant="outlined"
                size="small"
                href={order.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Track Package
              </Button>
            )}
          </Box>
        )}

        {/* Shipping Address */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Shipping to:</strong> {order.shippingAddress.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderStatus;