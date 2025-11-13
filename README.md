# Docapture UI

This is the frontend component of the Docapture application built with Next.js.

## Features

- Document field extraction interface
- Document summarization display
- RFP (Request for Proposal) generation UI
- Excel import/export capabilities
- Batch document processing dashboard
- Dynamic UI generation for various document types

## Getting Started

### Prerequisites

- Node.js
- Bun runtime
- Docker (optional, for containerized deployment)

### Development

1. Install dependencies: `bun install`
2. Run development server: `bun dev`
3. Access the application at `http://localhost:3000`

### Docker Deployment

1. Build and run with Docker Compose: `docker-compose up -d`
2. Access the application at `http://localhost:3000`

## Environment Variables

Create a `.env` file with the following variables:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_AUTH_API_BASE_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
API_KEY=your_api_key_here
GROQ_API_KEY=your_groq_api_key_here
```

## Security Notice

**Important**: Never commit actual API keys or secrets to the repository.
All sensitive information should be stored in environment variables.