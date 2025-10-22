class InstallationGuideTool {
  constructor(productService) {
    this.name = 'get_installation_guide';
    this.description = 'Get step-by-step installation instructions for specific parts';
    this.productService = productService;
  }

  async execute({ partNumber, modelNumber, partType }) {
    try {
      console.log(`🔧 Getting installation guide for: ${partNumber}${modelNumber ? ` on model ${modelNumber}` : ''}`);
      
      let searchParam = partNumber;
      if (!partNumber && partType) {
        searchParam = partType;
      }

      if (!searchParam) {
        return {
          success: false,
          error: 'Either part number or part type is required'
        };
      }

      const guide = await this.productService.getInstallationGuide(searchParam, modelNumber);
      
      if (!guide) {
        return {
          success: false,
          partNumber,
          message: `No installation guide found for ${partNumber || partType}. Please contact customer support.`
        };
      }

      return {
        success: true,
        guide: {
          partNumber: guide.partNumber,
          partName: guide.partName,
          difficulty: guide.difficulty,
          estimatedTime: guide.estimatedTime,
          toolsRequired: guide.toolsRequired,
          steps: guide.steps,
          warnings: guide.warnings,
          videoUrl: guide.videoUrl
        },
        message: this.formatGuideMessage(guide)
      };
    } catch (error) {
      console.error('Installation guide tool error:', error);
      return {
        success: false,
        error: 'Failed to retrieve installation guide'
      };
    }
  }

  formatGuideMessage(guide) {
    let message = `Installation guide for ${guide.partName} (${guide.partNumber}):\n`;
    message += `Difficulty: ${guide.difficulty} | Estimated Time: ${guide.estimatedTime}\n\n`;
    message += `Tools needed: ${guide.toolsRequired.join(', ')}\n\n`;
    
    if (guide.warnings.length > 0) {
      message += `⚠️  Important Warnings:\n`;
      guide.warnings.forEach(warning => {
        message += `• ${warning}\n`;
      });
      message += `\n`;
    }

    message += `Step-by-step instructions:\n`;
    guide.steps.forEach((step, index) => {
      message += `${index + 1}. ${step}\n`;
    });

    if (guide.videoUrl) {
      message += `\n📹 Video tutorial: ${guide.videoUrl}`;
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
            partNumber: { 
              type: 'string', 
              description: 'Specific part number to get installation guide for' 
            },
            modelNumber: { 
              type: 'string', 
              description: 'Appliance model number for model-specific instructions (optional)' 
            },
            partType: { 
              type: 'string', 
              description: 'Type of part (e.g., "water filter", "door gasket", "thermal fuse") if part number is unknown' 
            }
          }
        }
      }
    };
  }
}

module.exports = InstallationGuideTool;