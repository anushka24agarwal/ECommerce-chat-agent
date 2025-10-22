class OrderLookupTool {
  constructor(orderService) {
    this.name = 'lookup_order';
    this.description = 'Look up order status, tracking information, and order details';
    this.orderService = orderService;
  }

  async execute({ orderNumber, email, phone }) {
    try {
      console.log(`📦 Looking up order: ${orderNumber}`);
      
      if (!orderNumber) {
        return {
          success: false,
          error: 'Order number is required'
        };
      }

      const order = await this.orderService.getOrderStatus(orderNumber, email, phone);
      
      if (!order) {
        return {
          success: false,
          orderNumber,
          message: `Order ${orderNumber} not found. Please verify your order number.`
        };
      }

      return {
        success: true,
        order: {
          number: order.orderNumber,
          status: order.status,
          orderDate: order.orderDate,
          estimatedDelivery: order.estimatedDelivery,
          trackingNumber: order.trackingNumber,
          trackingUrl: order.trackingUrl,
          items: order.items,
          total: order.total,
          shippingAddress: order.shippingAddress
        },
        message: this.formatOrderMessage(order)
      };
    } catch (error) {
      console.error('Order lookup tool error:', error);
      return {
        success: false,
        error: 'Failed to look up order'
      };
    }
  }

  formatOrderMessage(order) {
    const statusMap = {
      'processing': 'is being processed',
      'shipped': 'has been shipped',
      'delivered': 'has been delivered',
      'cancelled': 'was cancelled'
    };

    const statusText = statusMap[order.status] || order.status;
    let message = `Order #${order.orderNumber} ${statusText}.`;

    if (order.trackingNumber) {
      message += ` Tracking number: ${order.trackingNumber}`;
    }

    if (order.estimatedDelivery) {
      message += ` Estimated delivery: ${new Date(order.estimatedDelivery).toLocaleDateString()}`;
    }

    return message;
  }

  getSchema() {
    return {
      type: 'function',
      function: {
        name: this.name,
        description: this.description,
        parameters: {
          type: 'object',
          properties: {
            orderNumber: { 
              type: 'string', 
              description: 'Order number to look up' 
            },
            email: { 
              type: 'string', 
              description: 'Email address associated with the order (optional)' 
            },
            phone: { 
              type: 'string', 
              description: 'Phone number associated with the order (optional)' 
            }
          },
          required: ['orderNumber']
        }
      }
    };
  }
}

module.exports = OrderLookupTool;