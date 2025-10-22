const axios = require('axios');

class DeepSeekService {
  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY;
    this.baseURL = 'https://api.deepseek.com/v1';
    
    if (!this.apiKey || this.apiKey === 'your_deepseek_api_key_here') {
      console.warn('⚠️  DEEPSEEK_API_KEY not configured. Running in demo mode.');
      this.demoMode = true;
    } else {
      this.demoMode = false;
    }

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      timeout: 30000
    });
  }

  async generateResponse(messages, tools = []) {
    // Demo mode response
    if (this.demoMode) {
      const lastUserMessage = messages.find(msg => msg.role === 'user') || messages[messages.length - 1];
      return {
        content: this.getDemoResponse(lastUserMessage?.content || ''),
        role: 'assistant'
      };
    }

    try {
      // Ensure all messages have the required role field
      const formattedMessages = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      const requestBody = {
        model: 'deepseek-chat',
        messages: formattedMessages,
        temperature: 0.1,
        max_tokens: 1500,
        stream: false
      };

      // Add tools if provided
      if (tools && tools.length > 0) {
        requestBody.tools = tools;
        requestBody.tool_choice = 'auto';
      }

      console.log('📨 Sending request to DeepSeek API...');
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      const response = await this.client.post('/chat/completions', requestBody);
      
      if (!response.data.choices || response.data.choices.length === 0) {
        throw new Error('No response from DeepSeek API');
      }

      console.log('✅ Received response from DeepSeek API');
      return response.data.choices[0].message;
    } catch (error) {
      console.error('❌ DeepSeek API error:', error.response?.data || error.message);
      
      // Return demo response on API error
      const lastUserMessage = messages.find(msg => msg.role === 'user') || messages[messages.length - 1];
      return {
        content: this.getDemoResponse(lastUserMessage?.content || '', true),
        role: 'assistant'
      };
    }
  }

  getDemoResponse(userMessage, isError = false) {
    const lowerMessage = userMessage.toLowerCase();
    
    if (isError) {
      return "I'm experiencing technical difficulties with my AI service. However, I can still help you with:\n\n• Product searches using our database\n• Compatibility checks\n• Order status lookups\n• Installation guides\n\nPlease try your question again, and I'll use our local tools to assist you.";
    }

    // Simple keyword-based responses for demo mode
    if (lowerMessage.includes('water filter') || lowerMessage.includes('ps11752778')) {
      return "I can help you with water filter PS11752778! This is a genuine OEM refrigerator water filter. Let me check our database for compatibility and installation instructions...\n\n✅ Found: This filter is compatible with most Whirlpool, Maytag, and KitchenAid refrigerator models.\n\n🔧 Installation: Typically involves turning the old filter counterclockwise to remove, and clockwise to install the new one. Run water for 2-3 minutes to flush.\n\n💡 Tip: Replace every 6 months for optimal performance.";
    }

    if (lowerMessage.includes('compatible') || lowerMessage.includes('wdt780saem1')) {
      return "I can check compatibility for you! Let me verify if your part works with model WDT780SAEM1...\n\n✅ Compatibility Check Complete: Part PS11752778 is compatible with Whirlpool model WDT780SAEM1.\n\nThis water filter is designed specifically for Whirlpool French door refrigerators like your model.";
    }

    if (lowerMessage.includes('install') || lowerMessage.includes('how to')) {
      return "I'd be happy to provide installation instructions! For detailed step-by-step guides:\n\n1. Let me search for the specific part installation guide\n2. I can provide tools needed and estimated time\n3. I'll include important safety warnings\n\nPlease provide the part number or describe what you're trying to install.";
    }

    if (lowerMessage.includes('order') || lowerMessage.includes('track')) {
      return "I can help you check your order status! Please provide your order number and I'll look up:\n\n• Current order status\n• Tracking information\n• Estimated delivery date\n• Order details\n\nWhat's your order number?";
    }

    if (lowerMessage.includes('ice maker') || lowerMessage.includes('not working')) {
      return "I can help troubleshoot your ice maker issue! Common solutions include:\n\n1. Check water filter - may need replacement\n2. Verify water line connections\n3. Inspect ice maker module\n4. Check freezer temperature (should be 0°F)\n\nLet me search for specific parts that might help resolve this issue...";
    }

    return "I'm the PartSelect assistant specializing in refrigerator and dishwasher parts! I can help you with:\n\n• Finding the right parts for your appliance\n• Checking compatibility with your model\n• Installation guides and instructions\n• Order status and tracking\n• Troubleshooting common issues\n\nWhat specific part or issue can I help you with today?";
  }
}

module.exports = DeepSeekService;