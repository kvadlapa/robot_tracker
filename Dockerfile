# Use official Python image
FROM python:3.9-slim

# Set work directory
WORKDIR /app

# Copy backend code
COPY backend/ ./backend/

# Copy built frontend
COPY frontend/build/ ./frontend/build/

COPY backend/robot_info_data.csv .
COPY backend/robot_data.csv .


# Install Python dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose the port the app runs on
EXPOSE 8000

# Run the Flask app
CMD ["python", "backend/app.py"]
