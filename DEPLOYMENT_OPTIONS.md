# Deployment Options for Docapture UI

This document outlines the different deployment options available for the Docapture UI application.

## Option 1: Development Mode with Hot Reload

To run in development mode with hot reloading:

```bash
docker-compose up docapture-ui-dev
```

Access the application at: http://localhost:3000

## Option 2: Production Mode with Next.js Server

To run in production mode using the Next.js standalone server:

```bash
docker-compose up docapture-ui-prod
```

Access the application at: http://localhost:3001

## Option 3: Static Export with Nginx

To run as a static site served by Nginx:

```bash
docker-compose up docapture-ui-static
```

Access the application at: http://localhost:8080

## Troubleshooting

If you're having issues accessing the containers:

1. Check if the containers are running:
   ```bash
   docker-compose ps
   ```

2. View container logs:
   ```bash
   docker-compose logs docapture-ui-dev
   ```

3. Ensure your firewall isn't blocking the ports

4. On Windows, make sure you're using WSL2 backend for Docker Desktop

## Environment Variables

The application expects several environment variables. Make sure to set them in your `.env` file or pass them through docker-compose.