# Fibonacci API with Flask and Docker

A containerized Flask application that calculates Fibonacci numbers using multithreading.

## Features

- RESTful API endpoint for calculating Fibonacci numbers
- Multithreaded computation
- Containerized with Docker
- Configured with Docker Compose for easy deployment

## API Usage

Send a POST request to `/fibonacci` with a JSON body containing the parameter `n`:

```json
{
  "n": 10
}
```

The API will return a JSON response with the calculated Fibonacci number:

```json
{
  "fibonacci": 55
}
```

## Building and Running

### Using Docker Compose

```bash
# Build and start the container
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

### Using Docker directly

```bash
# Build the Docker image
docker build -t fibonacci-api .

# Run the container
docker run -p 5000:5000 fibonacci-api
```

## Testing the API

You can use the included test script:

```bash
# Install requests library if not already installed
pip install requests

# Run the test script
python test_api.py
```

Or use curl:

```bash
curl -X POST http://localhost:5000/fibonacci \
  -H "Content-Type: application/json" \
  -d '{"n": 10}'
```

## Notes

- The Fibonacci calculation uses a recursive approach, which is not efficient for large values of n.
- The API is configured to run with Gunicorn using 1 worker and 4 threads.