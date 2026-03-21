# Real-Time AI Chatbot (Socket.IO + Gemini API)

A simple real-time AI chatbot built to explore how Large Language Models (LLMs) can work with real-time systems instead of traditional request–response APIs.

## Overview

Most chatbot implementations follow a basic HTTP flow:  
**request → response**

This project focuses on making AI interaction feel real-time using WebSockets.

It combines:
- Real-time communication (Socket.IO)
- AI responses (Gemini API)
- A chat-like frontend (React)

## Features

- Real-time messaging using Socket.IO  
- AI-generated responses via Gemini API  
- Basic conversation context handling  
- Simple and responsive chat UI  

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, Express.js  
- **Real-time:** Socket.IO  
- **AI:** Gemini API  

## How It Works

1. User sends a message from the frontend  
2. Message is sent to backend via Socket.IO  
3. Backend forwards the message (with context) to Gemini API  
4. AI response is received  
5. Response is emitted back to the client in real-time  

## Key Concepts Learned

- LLMs are stateless and require context to maintain conversations  
- WebSockets enable faster and smoother communication than REST  
- Managing conversation flow is important for better AI responses  