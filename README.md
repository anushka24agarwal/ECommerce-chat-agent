# 🛠️ PartSelect AI Chat Assistant

A sophisticated AI-powered chat assistant specialized in refrigerator and dishwasher parts, built with modern AI technologies including RAG (Retrieval-Augmented Generation) and agentic tool-calling capabilities.

![DeepSeek](https://img.shields.io/badge/DeepSeek-AI-darkblue?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

## 🎯 Overview

This project demonstrates a production-ready AI assistant that helps customers find appliance parts, check compatibility, get installation guides through an intuitive chat interface. The system combines large language models with custom tools and search to provide accurate, helpful responses.

## ✨ Features

### 🤖 AI-Powered Capabilities
- **Compatibility Checking**: Verify part-appliance compatibility automatically
- **Installation Guides**: Step-by-step installation instructions
- **Troubleshooting**: AI-guided problem diagnosis and solutions

### 🛠️ Technical Features
- **Architecture**: Robust Prompt Engineering for Query Retrieval
- **Tool-Calling Agent**: Dynamic tool selection based on user queries
- **Modern UI**: Responsive React interface with Material-UI
- **RESTful API**: Scalable Node.js backend with Express

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- DeepSeek API key
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ECommerce-chat-agent.git
cd ECommerce-chat-agent
```
2. **Backend Setup**
```bash
cd backend
npm install
cp .env.example .env
# Add your DeepSeek API key to .env
npm run dev
```

3. **Frontend Setup**
```bash
cd frontend
npm install
npm start
```

### Usage
```bash
"I need an ice maker assembly for Samsung fridge"
"How do I install a dishwasher drain pump?"
"Step-by-step guide for refrigerator water filter replacement"
