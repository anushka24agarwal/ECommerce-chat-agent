class CompatibilityCheckTool {
  constructor(productService) {
    this.name = 'check_compatibility';
    this.description = 'Check if a part is compatible with a specific appliance model number';
    this.productService = productService;
  }

  async execute({ partNumber, modelNumber }) {
    try {
      console.log(`🔧 Checking compatibility: Part ${partNumber} with Model ${modelNumber}`);
      
      if (!partNumber || !modelNumber) {
        return {
          success: false,
          compatible: false,
          message: 'Both part number and model number are required'
        };
      }

      const compatibility = await this.productService.checkCompatibility(partNumber, modelNumber);
      
      return {
        success: true,
        compatible: compatibility.isCompatible,
        partNumber,
        modelNumber,
        message: compatibility.isCompatible 
          ? `✅ Part ${partNumber} is compatible with model ${modelNumber}`
          : `❌ Part ${partNumber} is NOT compatible with model ${modelNumber}`,
        details: compatibility.details,
        alternatives: compatibility.alternatives || []
      };
    } catch (error) {
      console.error('Compatibility check tool error:', error);
      return {
        success: false,
        compatible: false,
        error: 'Failed to check compatibility'
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
            partNumber: { 
              type: 'string', 
              description: 'Part number to check compatibility for' 
            },
            modelNumber: { 
              type: 'string', 
              description: 'Appliance model number to check against' 
            }
          },
          required: ['partNumber', 'modelNumber']
        }
      }
    };
  }
}

module.exports = CompatibilityCheckTool;