class ProductService {
  constructor() {
    // Mock database - replace with actual database integration
    this.products = this.initializeProducts();
    this.compatibilityData = this.initializeCompatibility();
    this.installationGuides = this.initializeInstallationGuides();
  }

  initializeProducts() {
    return [
      {
        id: '1',
        partNumber: 'PS11752778',
        name: 'Refrigerator Water Filter',
        description: 'Genuine OEM water filter, reduces 99% of lead and removes over 20 other contaminants',
        price: 34.99,
        category: 'refrigerator',
        inStock: true,
        images: ['/images/water-filter.jpg'],
        specifications: {
          compatibility: 'Whirlpool, Maytag, KitchenAid, Jenn-Air',
          filterLife: '6 months',
          certifications: ['NSF 42', 'NSF 53']
        },
        symptoms: ['bad taste', 'bad odor', 'slow water flow', 'water quality']
      },
      {
        id: '2',
        partNumber: 'PS12345678',
        name: 'Dishwasher Upper Rack Roller Kit',
        description: 'Replacement roller kit for dishwasher upper rack, includes 4 rollers and pins',
        price: 12.99,
        category: 'dishwasher',
        inStock: true,
        images: ['/images/roller-kit.jpg'],
        specifications: {
          compatibility: 'Whirlpool, KitchenAid, Maytag dishwashers',
          material: 'Plastic and stainless steel',
          includes: '4 rollers, 4 pins'
        },
        symptoms: ['rack not sliding', 'broken rollers', 'rack stuck']
      },
      {
        id: '3',
        partNumber: 'WPW10264467',
        name: 'Ice Maker Assembly',
        description: 'Complete ice maker assembly for various refrigerator models',
        price: 89.99,
        category: 'refrigerator',
        inStock: true,
        images: ['/images/ice-maker.jpg'],
        specifications: {
          compatibility: 'Whirlpool, Maytag, Amana refrigerators',
          voltage: '120V',
          includes: 'Complete assembly with wiring'
        },
        symptoms: ['ice maker not working', 'no ice production', 'ice maker leaking']
      },
      {
        id: '4',
        partNumber: 'PS12345679',
        name: 'Refrigerator Door Gasket',
        description: 'Replacement door seal for refrigerator, ensures proper sealing and energy efficiency',
        price: 45.99,
        category: 'refrigerator',
        inStock: false,
        images: ['/images/door-gasket.jpg'],
        specifications: {
          compatibility: 'Various refrigerator models',
          material: 'Food-grade rubber',
          color: 'Black'
        },
        symptoms: ['door not sealing', 'cold air leak', 'frost buildup', 'high energy bills']
      },
      {
        id: '5',
        partNumber: 'WPW10723472',
        name: 'Dishwasher Drain Pump',
        description: 'Replacement drain pump for dishwasher, removes water during drain cycle',
        price: 67.50,
        category: 'dishwasher',
        inStock: true,
        images: ['/images/drain-pump.jpg'],
        specifications: {
          compatibility: 'Whirlpool, KitchenAid dishwashers',
          voltage: '120V',
          includes: 'Pump assembly'
        },
        symptoms: ['dishwasher not draining', 'standing water', 'drain error']
      }
    ];
  }

  initializeCompatibility() {
    return {
      'PS11752778': ['WDT780SAEM1', 'WRT318FZDM', 'WRX735SDHZ', 'WRS571CIHZ', 'all whirlpool french door'],
      'PS12345678': ['WDT730PAHZ', 'WDF540PADM', 'WDT710PAHZ', 'WDP370PAHZ'],
      'WPW10264467': ['WRS571CIHZ', 'WRX735SDHZ', 'WRT318FZDM', 'WRS588FIHZ'],
      'PS12345679': ['WRT318FZDM', 'WRS571CIHZ', 'WRX735SDHZ'],
      'WPW10723472': ['WDT730PAHZ', 'WDF540PADM', 'WDT710PAHZ']
    };
  }

  initializeInstallationGuides() {
    return {
      'PS11752778': {
        partNumber: 'PS11752778',
        partName: 'Refrigerator Water Filter',
        difficulty: 'Easy',
        estimatedTime: '5-10 minutes',
        toolsRequired: ['None required'],
        steps: [
          'Locate the water filter compartment in your refrigerator (typically in the grille or inside the refrigerator)',
          'Turn the old filter counterclockwise until it releases',
          'Remove the old filter and discard properly',
          'Remove protective covers from the new filter',
          'Insert the new filter and turn clockwise until it stops',
          'Run water through the dispenser for 3-5 minutes to flush the system',
          'Reset the filter indicator light if your model has one'
        ],
        warnings: [
          'Do not use tools to tighten the filter',
          'Ensure the filter is properly seated to prevent leaks',
          'Flush the system thoroughly before use'
        ],
        videoUrl: 'https://youtube.com/watch?v=example-water-filter'
      },
      'PS12345678': {
        partNumber: 'PS12345678',
        partName: 'Dishwasher Upper Rack Roller Kit',
        difficulty: 'Moderate',
        estimatedTime: '15-30 minutes',
        toolsRequired: ['Phillips screwdriver', 'Pliers'],
        steps: [
          'Remove the upper rack from the dishwasher',
          'Locate the broken or worn rollers',
          'Remove the retaining pins or screws holding the old rollers',
          'Install new rollers in the same position',
          'Secure with new pins or screws',
          'Test the rack movement before reloading'
        ],
        warnings: [
          'Disconnect power before starting',
          'Be careful with sharp edges inside the dishwasher',
          'Test rack movement thoroughly'
        ],
        videoUrl: 'https://youtube.com/watch?v=example-roller-install'
      },
      'water filter': {
        partNumber: 'General',
        partName: 'Refrigerator Water Filter',
        difficulty: 'Easy',
        estimatedTime: '5-10 minutes',
        toolsRequired: ['None required'],
        steps: [
          'Locate filter compartment',
          'Turn old filter counterclockwise to remove',
          'Insert new filter and turn clockwise until snug',
          'Flush system with 2-3 gallons of water'
        ],
        warnings: ['Do not overtighten', 'Flush thoroughly before use'],
        videoUrl: null
      }
    };
  }

  async searchProducts({ query, category, symptom, priceRange }) {
    let results = this.products;

    // Filter by search query
    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(product => 
        product.partNumber.toLowerCase().includes(lowerQuery) ||
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery) ||
        (product.symptoms && product.symptoms.some(s => s.toLowerCase().includes(lowerQuery)))
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      results = results.filter(product => product.category === category);
    }

    // Filter by symptom
    if (symptom) {
      const lowerSymptom = symptom.toLowerCase();
      results = results.filter(product => 
        product.symptoms && product.symptoms.some(s => s.toLowerCase().includes(lowerSymptom))
      );
    }

    // Filter by price range
    if (priceRange) {
      if (priceRange.min !== undefined) {
        results = results.filter(product => product.price >= priceRange.min);
      }
      if (priceRange.max !== undefined) {
        results = results.filter(product => product.price <= priceRange.max);
      }
    }

    return results;
  }

  async checkCompatibility(partNumber, modelNumber) {
    const compatibilityList = this.compatibilityData[partNumber];
    
    if (!compatibilityList) {
      return {
        isCompatible: false,
        details: `Part ${partNumber} not found in compatibility database`
      };
    }

    // Simple compatibility check - in real implementation, this would be more sophisticated
    const isCompatible = compatibilityList.some(pattern => 
      modelNumber.toLowerCase().includes(pattern.toLowerCase()) ||
      pattern.toLowerCase().includes(modelNumber.toLowerCase())
    );

    return {
      isCompatible,
      details: isCompatible 
        ? `Part ${partNumber} is compatible with ${modelNumber}`
        : `Part ${partNumber} is not listed as compatible with ${modelNumber}`,
      alternatives: isCompatible ? [] : await this.findAlternatives(partNumber, modelNumber)
    };
  }

  async findAlternatives(partNumber, modelNumber) {
    // Simple alternative finding - look for parts with similar descriptions
    const originalProduct = this.products.find(p => p.partNumber === partNumber);
    if (!originalProduct) return [];

    return this.products
      .filter(p => 
        p.partNumber !== partNumber && 
        p.category === originalProduct.category &&
        this.compatibilityData[p.partNumber]?.some(pattern => 
          modelNumber.toLowerCase().includes(pattern.toLowerCase())
        )
      )
      .slice(0, 3); // Return top 3 alternatives
  }

  async getInstallationGuide(partNumberOrType, modelNumber = null) {
    // First try exact part number match
    let guide = this.installationGuides[partNumberOrType];

    // If not found, try partial match by part type
    if (!guide) {
      const partType = partNumberOrType.toLowerCase();
      for (const [key, guideData] of Object.entries(this.installationGuides)) {
        if (guideData.partName.toLowerCase().includes(partType)) {
          guide = guideData;
          break;
        }
      }
    }

    return guide;
  }

  async getProductByPartNumber(partNumber) {
    return this.products.find(p => p.partNumber === partNumber);
  }

  async getProductsByCategory(category) {
    return this.products.filter(p => p.category === category);
  }
}

module.exports = ProductService;