from flask import Flask, request, jsonify
from flask_cors import CORS  # Import Flask-CORS
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def calculate_fibonacci_recursive(n):
    """Calculate the nth Fibonacci number recursively."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    else:
        return calculate_fibonacci_recursive(n-1) + calculate_fibonacci_recursive(n-2)

def calculate_fibonacci_iterative(n):
    """Calculate the nth Fibonacci number iteratively."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

def calculate_fibonacci(n):
    """Choose the appropriate Fibonacci calculation method based on input size."""
    # Use recursive method for demonstration, adjust as needed
    return calculate_fibonacci_recursive(n)

@app.route('/fibonacci', methods=['POST'])
def fibonacci():
    data = request.get_json()
    
    if not data or 'n' not in data:
        return jsonify({"error": "Missing 'n' parameter"}), 400
    
    try:
        n = int(data['n'])
        if n < 0:
            return jsonify({"error": "Parameter 'n' must be a non-negative integer"}), 400
    except ValueError:
        return jsonify({"error": "Parameter 'n' must be an integer"}), 400
    
    # Compute Fibonacci in a separate thread
    result = {"result": None, "error": None}
    
    def compute():
        try:
            result["result"] = calculate_fibonacci(n)
        except Exception as e:
            result["error"] = str(e)
    
    thread = threading.Thread(target=compute)
    thread.start()
    thread.join()  # Wait for computation to complete
    
    if result["error"]:
        return jsonify({"error": result["error"]}), 500
    
    return jsonify({"fibonacci": result["result"]})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
