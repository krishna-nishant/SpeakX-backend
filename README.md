# SpeakX Backend

A Node.js backend service using Express.js and gRPC for handling question-related operations.

## Project Structure

```
├── proto/
│   └── question.proto
├── config/
│   └── dbConnection.js
├── models/
│   └── questions.js
├── routes/
│   └── route.js
├── index.js
├── server.js
├── client.js
└── .env
```

## Features

- REST API endpoints using Express.js
- gRPC server implementation for question services
- MongoDB integration
- Pagination and search functionality
- CORS enabled
- Environment variable configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

```bash
# Clone the repository
git clone https://github.com/krishna-nishant/SpeakX-backend.git

# Navigate to project directory
cd SpeakX-backend

# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```plaintext
PORT=5000
GRPC_PORT=50051
MONGODB_URI=your_mongodb_connection_string
```

## Running the Application

```bash
# Start the Express server
npm run start:express

# Start the gRPC server
npm run start:grpc
```

## API Endpoints

The REST API is available at `/api` with the following endpoints:
- GET `/api/questions` - Fetch questions with pagination and search

## gRPC Services

The gRPC server provides the following services:
- `getQuestions` - Retrieves paginated questions with search functionality

## Technical Details

**Express Server (main.js)**
- Handles HTTP requests
- Implements CORS
- Processes JSON and URL-encoded bodies

**gRPC Server (server.js)**
- Implements question service
- Supports pagination and search
- Configurable message size limits
- MongoDB integration

**gRPC Client (client.js)**
- Provides connection to gRPC server
- Configurable message size limits
- Environment-based port configuration

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

