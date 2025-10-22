class ProductSearchTool {
  constructor(productService) {
    this.name = 'product_search';
    this.description = 'Search for refrigerator and dishwasher parts by part number, name, description, or symptoms';
    this.productService = productService;
  }

  async execute({ query, category, symptom, priceRange }) {
    try {
      console.log(`🔍 Searching products with query: "${query}", category: ${category}, symptom: ${symptom}`);
      
      const results = await this.productService.searchProducts({
        query,
        category,
        symptom,
        priceRange
      });

      return {
        success: true,
        products: results,
        count: results.length,
        message: results.length > 0 
          ? `Found ${results.length} product(s) matching your search`
          : 'No products found matching your criteria'
      };
    } catch (error) {
      console.error('Product search tool error:', error);
      return {
        success: false,
        products: [],
        count: 0,
        error: 'Failed to search products'
      };
    }
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
            query: { 
              type: 'string', 
              description: 'Search query for products (part number, name, description, or symptoms)' 
            },
            category: { 
              type: 'string', 
              enum: ['refrigerator', 'dishwasher', 'all'],
              description: 'Filter by appliance category'
            },
            symptom: {
              type: 'string',
              description: 'Specific symptom or problem (e.g., "not cooling", "leaking water", "ice maker not working")'
            },
            priceRange: {
              type: 'object',
              properties: {
                min: { type: 'number', description: 'Minimum price' },
                max: { type: 'number', description: 'Maximum price' }
              }
            }
          },
          required: ['query']
        }
      }
    };
  }
}

module.exports = ProductSearchTool;