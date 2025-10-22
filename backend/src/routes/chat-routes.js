// const express = require('express');
// const ChatAgent = require('../agents/chat-agent');

// const router = express.Router();
// const chatAgent = new ChatAgent();

// router.post('/message', async (req, res) => {
//   try {
//     const { message, conversationHistory = [] } = req.body;

//     if (!message || typeof message !== 'string') {
//       return res.status(400).json({
//         error: 'Invalid request',
//         message: 'Message is required and must be a string'
//       });
//     }

//     const response = await chatAgent.processMessage(message, conversationHistory);
    
//     res.json({
//       success: true,
//       response: response.response,
//       data: response.data,
//       timestamp: response.timestamp
//     });

//   } catch (error) {
//     console.error('Chat route error:', error);
//     res.status(500).json({
//       error: 'Failed to process message',
//       message: error.message
//     });
//   }
// });

// module.exports = router;


const express = require('express');
const SimpleChatAgent = require('../agents/chat-agent');

const router = express.Router();
const chatAgent = new SimpleChatAgent();

router.post('/message', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Message is required and must be a string'
      });
    }

    console.log(`💬 Processing message: "${message.substring(0, 50)}..."`);
    
    const response = await chatAgent.processMessage(message, conversationHistory);
    
    console.log('✅ Response generated successfully');
    
    res.json({
      success: true,
      response: response.response,
      data: response.data,
      timestamp: response.timestamp
    });

  } catch (error) {
    console.error('❌ Chat route error:', error);
    res.status(500).json({
      error: 'Failed to process message',
      message: error.message
    });
  }
});

module.exports = router;