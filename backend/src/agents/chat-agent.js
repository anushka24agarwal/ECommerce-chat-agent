// const DeepSeekService = require('../services/deepseek-service');
// const ProductSearchTool = require('../tools/product-search');
// const CompatibilityCheckTool = require('../tools/compatibility-check');
// const InstallationGuideTool = require('../tools/installation-guide');
// const OrderLookupTool = require('../tools/order-lookup');
// const ProductService = require('../services/product-service');
// const OrderService = require('../services/order-service');

// class ChatAgent {
//   constructor() {
//     this.deepSeekService = new DeepSeekService();
    
//     // Initialize services
//     this.productService = new ProductService();
//     this.orderService = new OrderService();
    
//     // Initialize tools
//     this.tools = [
//       new ProductSearchTool(this.productService),
//       new CompatibilityCheckTool(this.productService),
//       new InstallationGuideTool(this.productService),
//       new OrderLookupTool(this.orderService)
//     ];
    
//     this.systemPrompt = `You are a specialized assistant for PartSelect e-commerce website, focused exclusively on refrigerator and dishwasher parts.

// CRITICAL GUIDELINES:
// 1. ONLY answer questions related to refrigerator and dishwasher parts, installation, compatibility, and orders
// 2. If asked about other appliances or off-topic subjects, politely decline and refocus on your specialty
// 3. Use the available tools to provide accurate, specific information
// 4. Always verify part numbers and model compatibility
// 5. Provide helpful, step-by-step guidance for installations and troubleshooting

// AVAILABLE TOOLS:
// - product_search: Find parts by number, name, description, or symptoms
// - check_compatibility: Verify part-appliance compatibility
// - get_installation_guide: Provide installation instructions
// - lookup_order: Check order status and details

// RESPONSE FORMAT:
// - Be concise but thorough
// - Include part numbers and model numbers when relevant
// - Provide actionable steps for installations
// - Always double-check compatibility before recommending parts`;
//   }

//   async processMessage(userMessage, conversationHistory = []) {
//     const messages = [
//       { role: 'system', content: this.systemPrompt },
//       ...conversationHistory,
//       { role: 'user', content: userMessage }
//     ];

//     const toolSchemas = this.tools.map(tool => tool.getSchema());

//     try {
//       const response = await this.deepSeekService.generateResponse(messages, toolSchemas);
      
//       // Handle tool calls if any
//       if (response.tool_calls) {
//         const toolResults = await this.executeToolCalls(response.tool_calls);
        
//         // Send tool results back to DeepSeek for final response
//         messages.push(response);
//         messages.push({
//           role: 'tool',
//           content: JSON.stringify(toolResults),
//           tool_call_id: response.tool_calls[0].id
//         });

//         const finalResponse = await this.deepSeekService.generateResponse(messages);
//         return this.formatResponse(finalResponse, toolResults);
//       }

//       return this.formatResponse(response);
//     } catch (error) {
//       console.error('Agent processing error:', error);
//       return {
//         response: "I apologize, but I'm having trouble processing your request right now. Please try again or contact customer support.",
//         data: null,
//         timestamp: new Date().toISOString()
//       };
//     }
//   }

//   async executeToolCalls(toolCalls) {
//     const results = [];
    
//     for (const toolCall of toolCalls) {
//       const tool = this.tools.find(t => t.name === toolCall.function.name);
//       if (tool) {
//         try {
//           const args = JSON.parse(toolCall.function.arguments);
//           const result = await tool.execute(args);
//           results.push({
//             tool_call_id: toolCall.id,
//             result: result
//           });
//         } catch (error) {
//           console.error(`Tool execution error for ${toolCall.function.name}:`, error);
//           results.push({
//             tool_call_id: toolCall.id,
//             error: 'Tool execution failed'
//           });
//         }
//       }
//     }
    
//     return results;
//   }

//   formatResponse(deepSeekResponse, toolResults = null) {
//     return {
//       response: deepSeekResponse.content,
//       data: toolResults,
//       timestamp: new Date().toISOString()
//     };
//   }
// }

// module.exports = ChatAgent;


// // const DeepSeekService = require('../services/deepseek-service');
// // const ProductSearchTool = require('../tools/product-search');
// // const CompatibilityCheckTool = require('../tools/compatibility-check');
// // const InstallationGuideTool = require('../tools/installation-guide');
// // const OrderLookupTool = require('../tools/order-lookup');
// // const ProductService = require('../services/product-service');
// // const OrderService = require('../services/order-service');

// // class ChatAgent {
// //   constructor() {
// //     this.deepSeekService = new DeepSeekService();
    
// //     // Initialize services
// //     this.productService = new ProductService();
// //     this.orderService = new OrderService();
    
// //     // Initialize tools
// //     this.tools = [
// //       new ProductSearchTool(this.productService),
// //       new CompatibilityCheckTool(this.productService),
// //       new InstallationGuideTool(this.productService),
// //       new OrderLookupTool(this.orderService)
// //     ];
    
// //     this.systemPrompt = `You are a specialized assistant for PartSelect e-commerce website, focused exclusively on refrigerator and dishwasher parts.

// // CRITICAL GUIDELINES:
// // 1. ONLY answer questions related to refrigerator and dishwasher parts, installation, compatibility, and orders
// // 2. If asked about other appliances or off-topic subjects, politely decline and refocus on your specialty
// // 3. Use the available tools to provide accurate, specific information
// // 4. Always verify part numbers and model compatibility
// // 5. Provide helpful, step-by-step guidance for installations and troubleshooting

// // AVAILABLE TOOLS:
// // - product_search: Find parts by number, name, description, or symptoms
// // - check_compatibility: Verify part-appliance compatibility
// // - get_installation_guide: Provide installation instructions
// // - lookup_order: Check order status and details

// // RESPONSE FORMAT:
// // - Be concise but thorough
// // - Include part numbers and model numbers when relevant
// // - Provide actionable steps for installations
// // - Always double-check compatibility before recommending parts`;
// //   }

// //   async processMessage(userMessage, conversationHistory = []) {
// //     // Format messages properly with role field
// //     const messages = [
// //       { role: 'system', content: this.systemPrompt },
// //       ...conversationHistory.map(msg => ({
// //         role: msg.role || (msg.sender === 'user' ? 'user' : 'assistant'),
// //         content: msg.content
// //       })),
// //       { role: 'user', content: userMessage }
// //     ];

// //     const toolSchemas = this.tools.map(tool => tool.getSchema());

// //     try {
// //       const response = await this.deepSeekService.generateResponse(messages, toolSchemas);
      
// //       // Handle tool calls if any
// //       if (response.tool_calls) {
// //         const toolResults = await this.executeToolCalls(response.tool_calls);
        
// //         // Send tool results back to DeepSeek for final response
// //         messages.push({
// //           role: 'assistant',
// //           content: null,
// //           tool_calls: response.tool_calls
// //         });
        
// //         messages.push({
// //           role: 'tool',
// //           content: JSON.stringify(toolResults),
// //           tool_call_id: response.tool_calls[0].id
// //         });

// //         const finalResponse = await this.deepSeekService.generateResponse(messages);
// //         return this.formatResponse(finalResponse, toolResults);
// //       }

// //       return this.formatResponse(response);
// //     } catch (error) {
// //       console.error('Agent processing error:', error);
// //       return {
// //         response: "I apologize, but I'm having trouble processing your request right now. Please try again or contact customer support.",
// //         data: null,
// //         timestamp: new Date().toISOString()
// //       };
// //     }
// //   }

// //   async executeToolCalls(toolCalls) {
// //     const results = [];
    
// //     for (const toolCall of toolCalls) {
// //       const tool = this.tools.find(t => t.name === toolCall.function.name);
// //       if (tool) {
// //         try {
// //           const args = JSON.parse(toolCall.function.arguments);
// //           const result = await tool.execute(args);
// //           results.push({
// //             tool_call_id: toolCall.id,
// //             result: result
// //           });
// //         } catch (error) {
// //           console.error(`Tool execution error for ${toolCall.function.name}:`, error);
// //           results.push({
// //             tool_call_id: toolCall.id,
// //             error: 'Tool execution failed'
// //           });
// //         }
// //       }
// //     }
    
// //     return results;
// //   }

// //   formatResponse(deepSeekResponse, toolResults = null) {
// //     return {
// //       response: deepSeekResponse.content,
// //       data: toolResults,
// //       timestamp: new Date().toISOString()
// //     };
// //   }
// // }

// // module.exports = ChatAgent;



const DeepSeekService = require('../services/deepseek-service');
const ProductSearchTool = require('../tools/product-search');
const CompatibilityCheckTool = require('../tools/compatibility-check');
const InstallationGuideTool = require('../tools/installation-guide');
const OrderLookupTool = require('../tools/order-lookup');
const ProductService = require('../services/product-service');
const OrderService = require('../services/order-service');

class SimpleChatAgent {
  constructor() {
    this.deepSeekService = new DeepSeekService();
    
    // Initialize services
    this.productService = new ProductService();
    this.orderService = new OrderService();
    
    // Initialize tools
    this.tools = {
      product_search: new ProductSearchTool(this.productService),
      check_compatibility: new CompatibilityCheckTool(this.productService),
      get_installation_guide: new InstallationGuideTool(this.productService),
      lookup_order: new OrderLookupTool(this.orderService)
    };
    
    this.systemPrompt = `You are a specialized assistant for PartSelect e-commerce website, focused exclusively on refrigerator and dishwasher parts.

CRITICAL GUIDELINES:
1. ONLY answer questions related to refrigerator and dishwasher parts, installation, compatibility, and orders
2. If asked about other appliances or off-topic subjects, politely decline and refocus on your specialty
3. Provide helpful, step-by-step guidance for installations and troubleshooting

RESPONSE FORMAT:
- Be concise but thorough
- Include part numbers and model numbers when relevant
- Provide actionable steps for installations`;
  }

  async processMessage(userMessage, conversationHistory = []) {
  // Normalize conversation history
  const normalizedHistory = conversationHistory.map(m => ({
    role: m.role || (m.fromUser ? 'user' : 'assistant'), // fallback
    content: m.content
  }));

  const messages = [
    { role: 'system', content: this.systemPrompt },
    ...normalizedHistory,
    { role: 'user', content: userMessage }
  ];

  try {
    // First, get initial response from DeepSeek
    const initialResponse = await this.deepSeekService.generateResponse(messages);

    // Execute tools based on current user message
    const toolResults = await this.executeToolsBasedOnMessage(userMessage);

    // Combine tool results into final response
    let finalResponse = initialResponse.content;
    toolResults.forEach(result => {
      if (result.success && result.products && result.products.length > 0) {
        finalResponse += `\n\nI found ${result.products.length} product(s) that might help:\n`;
        result.products.forEach(product => {
          finalResponse += `• ${product.name} (Part #${product.partNumber}) - $${product.price}\n`;
        });
      }
    });

    return {
      response: finalResponse,
      data: toolResults.length > 0 ? toolResults : null,
      timestamp: new Date().toISOString()
    };

  } catch (error) {
    console.error('Agent processing error:', error);
    return {
      response: "I apologize, but I'm having trouble processing your request right now. Please try again or contact customer support.",
      data: null,
      timestamp: new Date().toISOString()
    };
  }
}
//   async processMessage(userMessage, conversationHistory = []) {
//     const messages = [
//       { role: 'system', content: this.systemPrompt },
//       ...conversationHistory,
//       { role: 'user', content: userMessage }
//     ];

//     try {
//       // First, get initial response from DeepSeek
//       const initialResponse = await this.deepSeekService.generateResponse(messages);
      
//       // If DeepSeek suggests using tools in its response, execute them directly
//       const toolResults = await this.executeToolsBasedOnMessage(userMessage);
      
//       // If we have tool results, include them in a final response
//       if (toolResults.length > 0) {
//         let finalResponse = initialResponse.content;
        
//         toolResults.forEach(result => {
//           if (result.success && result.products && result.products.length > 0) {
//             finalResponse += `\n\nI found ${result.products.length} product(s) that might help:\n`;
//             result.products.forEach(product => {
//               finalResponse += `• ${product.name} (Part #${product.partNumber}) - $${product.price}\n`;
//             });
//           }
//         });
        
//         return {
//           response: finalResponse,
//           data: toolResults,
//           timestamp: new Date().toISOString()
//         };
//       }

//       return {
//         response: initialResponse.content,
//         data: null,
//         timestamp: new Date().toISOString()
//       };
//     } catch (error) {
//       console.error('Agent processing error:', error);
//       return {
//         response: "I apologize, but I'm having trouble processing your request right now. Please try again or contact customer support.",
//         data: null,
//         timestamp: new Date().toISOString()
//       };
//     }
//   }

  async executeToolsBasedOnMessage(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    const results = [];

    // Simple keyword-based tool execution
    if (lowerMessage.includes('ice maker') || 
        lowerMessage.includes('not working') || 
        lowerMessage.includes('broken') ||
        lowerMessage.includes('find') ||
        lowerMessage.includes('search')) {
      
      try {
        const searchResult = await this.tools.product_search.execute({
          query: this.extractSearchQuery(userMessage),
          category: this.extractCategory(userMessage)
        });
        results.push(searchResult);
      } catch (error) {
        console.error('Product search error:', error);
      }
    }

    if (lowerMessage.includes('compatible') || lowerMessage.includes('work with')) {
      try {
        const partNumber = this.extractPartNumber(userMessage);
        const modelNumber = this.extractModelNumber(userMessage);
        
        if (partNumber && modelNumber) {
          const compatibilityResult = await this.tools.check_compatibility.execute({
            partNumber,
            modelNumber
          });
          results.push(compatibilityResult);
        }
      } catch (error) {
        console.error('Compatibility check error:', error);
      }
    }

    if (lowerMessage.includes('install') || lowerMessage.includes('how to')) {
      try {
        const partNumber = this.extractPartNumber(userMessage) || this.extractPartType(userMessage);
        const guideResult = await this.tools.get_installation_guide.execute({
          partNumber,
          partType: this.extractPartType(userMessage)
        });
        results.push(guideResult);
      } catch (error) {
        console.error('Installation guide error:', error);
      }
    }

    if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
      try {
        const orderNumber = this.extractOrderNumber(userMessage);
        if (orderNumber) {
          const orderResult = await this.tools.lookup_order.execute({
            orderNumber
          });
          results.push(orderResult);
        }
      } catch (error) {
        console.error('Order lookup error:', error);
      }
    }

    return results;
  }

  extractSearchQuery(message) {
    const keywords = ['ice maker', 'water filter', 'dishwasher', 'refrigerator', 'part'];
    for (const keyword of keywords) {
      if (message.toLowerCase().includes(keyword)) {
        return keyword;
      }
    }
    return 'appliance part';
  }

  extractCategory(message) {
    if (message.toLowerCase().includes('refrigerator') || message.toLowerCase().includes('fridge')) {
      return 'refrigerator';
    }
    if (message.toLowerCase().includes('dishwasher')) {
      return 'dishwasher';
    }
    return 'all';
  }

  extractPartNumber(message) {
    // Simple regex to find potential part numbers (alphanumeric with possible dashes)
    const partNumberMatch = message.match(/([A-Z0-9]{5,15})/);
    return partNumberMatch ? partNumberMatch[1] : null;
  }

  extractModelNumber(message) {
    // Simple regex to find potential model numbers
    const modelNumberMatch = message.match(/([A-Z0-9]{8,12})/);
    return modelNumberMatch ? modelNumberMatch[1] : null;
  }

  extractPartType(message) {
    const partTypes = ['water filter', 'ice maker', 'door gasket', 'drain pump', 'roller'];
    for (const type of partTypes) {
      if (message.toLowerCase().includes(type)) {
        return type;
      }
    }
    return null;
  }

  extractOrderNumber(message) {
    const orderMatch = message.match(/(PS\d{8})/);
    return orderMatch ? orderMatch[1] : null;
  }
}

module.exports = SimpleChatAgent;