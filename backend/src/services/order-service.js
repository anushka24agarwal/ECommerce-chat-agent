class OrderService {
  constructor() {
    // Mock order database - replace with actual order management system
    this.orders = this.initializeOrders();
  }

  initializeOrders() {
    return [
      {
        orderNumber: 'PS12345678',
        email: 'customer@example.com',
        phone: '555-0123',
        status: 'shipped',
        orderDate: '2024-01-15',
        estimatedDelivery: '2024-01-22',
        trackingNumber: '1Z1234567890123456',
        trackingUrl: 'https://www.ups.com/track?trackingNumber=1Z1234567890123456',
        items: [
          {
            partNumber: 'PS11752778',
            name: 'Refrigerator Water Filter',
            quantity: 1,
            price: 34.99
          }
        ],
        total: 41.98, // including shipping
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zipCode: '12345',
          country: 'USA'
        },
        shippingMethod: 'Standard Shipping'
      },
      {
        orderNumber: 'PS87654321',
        email: 'another@example.com',
        phone: '555-0456',
        status: 'processing',
        orderDate: '2024-01-18',
        estimatedDelivery: '2024-01-25',
        trackingNumber: null,
        trackingUrl: null,
        items: [
          {
            partNumber: 'PS12345678',
            name: 'Dishwasher Upper Rack Roller Kit',
            quantity: 1,
            price: 12.99
          },
          {
            partNumber: 'WPW10723472',
            name: 'Dishwasher Drain Pump',
            quantity: 1,
            price: 67.50
          }
        ],
        total: 89.49,
        shippingAddress: {
          name: 'Jane Smith',
          street: '456 Oak Ave',
          city: 'Somewhere',
          state: 'TX',
          zipCode: '67890',
          country: 'USA'
        },
        shippingMethod: 'Express Shipping'
      },
      {
        orderNumber: 'PS11223344',
        email: 'test@example.com',
        phone: '555-0789',
        status: 'delivered',
        orderDate: '2024-01-10',
        estimatedDelivery: '2024-01-17',
        deliveredDate: '2024-01-16',
        trackingNumber: '1Z9876543210987654',
        trackingUrl: 'https://www.ups.com/track?trackingNumber=1Z9876543210987654',
        items: [
          {
            partNumber: 'WPW10264467',
            name: 'Ice Maker Assembly',
            quantity: 1,
            price: 89.99
          }
        ],
        total: 96.98,
        shippingAddress: {
          name: 'Bob Wilson',
          street: '789 Pine Rd',
          city: 'Anycity',
          state: 'FL',
          zipCode: '54321',
          country: 'USA'
        },
        shippingMethod: 'Standard Shipping'
      }
    ];
  }

  async getOrderStatus(orderNumber, email = null, phone = null) {
    // Find order by order number
    let order = this.orders.find(o => o.orderNumber === orderNumber);

    // If email or phone provided, use them for additional verification
    if (order && email) {
      if (order.email.toLowerCase() !== email.toLowerCase()) {
        return null; // Email doesn't match
      }
    }

    if (order && phone) {
      if (order.phone !== phone.replace(/\D/g, '')) {
        return null; // Phone doesn't match
      }
    }

    return order;
  }

  async getOrderHistory(email, limit = 5) {
    const customerOrders = this.orders
      .filter(order => order.email.toLowerCase() === email.toLowerCase())
      .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
      .slice(0, limit);

    return customerOrders;
  }

  async createReturn(orderNumber, items) {
    // Mock return creation
    const order = await this.getOrderStatus(orderNumber);
    if (!order) {
      throw new Error('Order not found');
    }

    const returnNumber = `RTN${Date.now()}`;
    const returnRequest = {
      returnNumber,
      orderNumber,
      items,
      status: 'pending',
      createdDate: new Date().toISOString().split('T')[0],
      estimatedRefund: items.reduce((total, item) => total + (item.price * item.quantity), 0)
    };

    return returnRequest;
  }

  async cancelOrder(orderNumber) {
    const order = await this.getOrderStatus(orderNumber);
    if (!order) {
      throw new Error('Order not found');
    }

    if (order.status === 'shipped' || order.status === 'delivered') {
      throw new Error('Cannot cancel shipped or delivered order');
    }

    order.status = 'cancelled';
    return {
      success: true,
      message: `Order ${orderNumber} has been cancelled`,
      refundAmount: order.total
    };
  }

  getShippingCarriers() {
    return [
      { code: 'ups', name: 'UPS', url: 'https://www.ups.com/track' },
      { code: 'fedex', name: 'FedEx', url: 'https://www.fedex.com/tracking' },
      { code: 'usps', name: 'USPS', url: 'https://tools.usps.com/go/TrackConfirmAction' }
    ];
  }
}

module.exports = OrderService;