import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import {
  ShoppingCart,
  Info,
  CheckCircle,
  Cancel,
} from '@mui/icons-material';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onAddToCart,
}) => {
  return (
    <Card 
      sx={{ 
        maxWidth: 400, 
        mb: 2,
        border: product.inStock ? '1px solid #e0e0e0' : '1px solid #ffcdd2',
      }}
    >
      <CardContent>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography variant="h6" component="h3" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Part #: {product.partNumber}
            </Typography>
          </Box>
          <Chip
            label={product.category}
            size="small"
            color="primary"
            variant="outlined"
          />
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {product.description}
        </Typography>

        {/* Price and Stock */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary">
            ${product.price}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {product.inStock ? (
              <>
                <CheckCircle color="success" fontSize="small" />
                <Typography variant="body2" color="success.main">
                  In Stock
                </Typography>
              </>
            ) : (
              <>
                <Cancel color="error" fontSize="small" />
                <Typography variant="body2" color="error.main">
                  Out of Stock
                </Typography>
              </>
            )}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Compatibility */}
        <Typography variant="body2" sx={{ mb: 2 }}>
          <strong>Compatible with:</strong> {product.specifications.compatibility}
        </Typography>

        {/* Symptoms */}
        {product.symptoms && product.symptoms.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>Common issues:</strong> {product.symptoms.join(', ')}
            </Typography>
          </Box>
        )}

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<Info />}
            onClick={() => onViewDetails(product)}
            fullWidth
          >
            Details
          </Button>
          <Button
            variant="contained"
            size="small"
            startIcon={<ShoppingCart />}
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            fullWidth
          >
            Add to Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;