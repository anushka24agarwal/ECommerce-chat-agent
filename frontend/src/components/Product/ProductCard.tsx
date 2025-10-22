import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip } from '@mui/material';
import { ShoppingCart, Info } from '@mui/icons-material';

interface Product {
  id: string;
  name: string;
  partNumber: string;
  price: number;
  image: string;
  description: string;
  category: 'refrigerator' | 'dishwasher';
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onViewDetails, onAddToCart }) => {
  return (
    <Card elevation={2} sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Box sx={{ width: 100, height: 100, backgroundColor: '#f5f5f5' }}>
            {/* Product image placeholder */}
            <img 
              src={product.image} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Part #: {product.partNumber}
            </Typography>
            <Typography variant="body1" color="primary" gutterBottom>
              ${product.price}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <Chip 
                label={product.category} 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                label={product.inStock ? 'In Stock' : 'Out of Stock'} 
                size="small"
                color={product.inStock ? 'success' : 'error'}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                startIcon={<Info />}
                onClick={() => onViewDetails(product)}
              >
                Details
              </Button>
              <Button
                variant="contained"
                size="small"
                startIcon={<ShoppingCart />}
                onClick={() => onAddToCart(product)}
                disabled={!product.inStock}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;