const DEEPSEEK_CONFIG = {
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: 'https://api.deepseek.com/v1',
  model: 'deepseek-chat',
  temperature: 0.1,
  maxTokens: 1000
};

module.exports = { DEEPSEEK_CONFIG };