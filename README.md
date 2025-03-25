# Kiulizi Anga - AI Assistant

A modern AI chat application powered by Google's Gemini AI. This application provides an intuitive interface for users to interact with a sophisticated AI model.

## Features

- Real-time AI responses using Gemini 1.5 Pro
- Modern, responsive UI design
- Cross-browser compatibility
- Mobile-friendly interface

## Project Structure

```
kiulizi-anga/
├── backend/
│   ├── server.js        # Express server and Gemini AI integration
│   ├── package.json     # Backend dependencies
│   └── .env            # Environment variables
└── frontend/
    ├── index.html      # Main HTML file
    ├── styles.css      # Modern CSS styles
    └── scripts.js      # Frontend JavaScript
```

## Setup Instructions

1. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

2. Configure environment variables:
   Create a `.env` file in the backend directory with:
   ```
   GEMINI_API_KEY=your_api_key_here
   PORT=5000
   ```

3. Start the backend server:
   ```bash
   cd backend
   npm run dev
   ```

4. Start the frontend:
   ```bash
   cd frontend
   python3 -m http.server 8000
   ```

5. Access the application:
   Open `http://localhost:8000` in your web browser

## API Endpoints

- `GET /` - Health check endpoint
- `POST /chat` - Send messages to the AI
  - Request body: `{ "message": "Your message here" }`
  - Response: `{ "reply": "AI response here" }`

## Technologies Used

- Backend:
  - Node.js
  - Express
  - Google Gemini AI API
  - dotenv
  - cors
  - nodemon (development)

- Frontend:
  - HTML5
  - CSS3
  - JavaScript
  - Font Awesome icons

## Development

The backend uses nodemon for automatic server restarts during development. The frontend is served using Python's simple HTTP server for development purposes.

## Production Deployment

For production:
1. Use a proper web server instead of Python's HTTP server
2. Set up proper CORS policies
3. Implement rate limiting
4. Add error handling and logging
5. Set up SSL/TLS for secure communication
