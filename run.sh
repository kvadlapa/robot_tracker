#!/bin/bash

# Build React frontend
echo "📦 Building React frontend..."
cd frontend
npm install
npm run build

# Go back to root
cd ..

# Build Docker image
echo "🐳 Building Docker image..."
docker build -t robot-tracker .

# Run Docker container
echo "🚀 Running app at http://localhost:8000 ..."
docker run -p 8000:8000 robot-tracker

