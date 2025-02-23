# Use official Python image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy files
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Start the Flask application
CMD ["python", "app.py"]
