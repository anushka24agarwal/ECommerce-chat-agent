import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        mt: 'auto',
        py: 3,
      }}
    >
      <Container maxWidth="lg">
        {/* Main Footer Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 3,
          }}
        >
          {/* Company Info */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom color="primary.main">
              PartSelect
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your trusted partner for genuine appliance parts and expert support.
            </Typography>
            
            {/* Contact Info */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  +1 (800) 555-PART
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  support@partselect.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn fontSize="small" color="primary" />
                <Typography variant="body2" color="text.secondary">
                  123 Appliance Lane, Tech City, TC 12345
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="600">
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover" variant="body2">
                Refrigerator Parts
              </Link>
              <Link href="#" color="text.secondary" underline="hover" variant="body2">
                Dishwasher Parts
              </Link>
              <Link href="#" color="text.secondary" underline="hover" variant="body2">
                Installation Guides
              </Link>
              <Link href="#" color="text.secondary" underline="hover" variant="body2">
                Compatibility Check
              </Link>
            </Box>
          </Box>

          {/* Support */}
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" gutterBottom fontWeight="600">
              Support
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" color="text.secondary" underline="hover" variant="body2">
                Help Center
              </Link>
              <Link href="#" color="text.secondary" underline="hover" variant="body2">
                Shipping Info
              </Link>
              <Link href="#" color="text.secondary" underline="hover" variant="body2">
                Returns & Warranty
              </Link>
              <Link href="#" color="text.secondary" underline="hover" variant="body2">
                Contact Support
              </Link>
            </Box>
          </Box>

          {/* Social Media */}
          <Box>
            <Typography variant="subtitle1" gutterBottom fontWeight="600">
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="Facebook">
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <Facebook fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Twitter">
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <Twitter fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Instagram">
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <Instagram fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="LinkedIn">
                <IconButton
                  size="small"
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    color: 'text.secondary',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                    },
                  }}
                >
                  <LinkedIn fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Bottom Bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © 2024 PartSelect. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Privacy Policy
            </Link>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Terms of Service
            </Link>
            <Link href="#" color="text.secondary" underline="hover" variant="body2">
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;