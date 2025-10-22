export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  type: 'text' | 'product' | 'order' | 'loading';
  data?: any;
}

export interface Product {
  id: string;
  partNumber: string;
  name: string;
  description: string;
  price: number;
  category: 'refrigerator' | 'dishwasher';
  inStock: boolean;
  images: string[];
  specifications: {
    compatibility: string;
    [key: string]: any;
  };
  symptoms: string[];
}

export interface Order {
  orderNumber: string;
  status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
  trackingUrl?: string;
  items: Array<{
    partNumber: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface ChatResponse {
  success: boolean;
  response: string;
  data?: any;
  timestamp: string;
}