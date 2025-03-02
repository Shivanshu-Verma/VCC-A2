import requests
import json
import time

def test_fibonacci_api():
    url = "http://localhost:5000/fibonacci"
    
    # Test with n=10
    payload = {"n": 10}
    headers = {"Content-Type": "application/json"}
    
    print(f"Testing with n={payload['n']}...")
    start_time = time.time()
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    end_time = time.time()
    
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.json()}")
    print(f"Time taken: {end_time - start_time:.4f} seconds")
    
    # Test with larger n (be careful with large values as recursive Fibonacci is slow)
    payload = {"n": 20}
    
    print(f"\nTesting with n={payload['n']}...")
    start_time = time.time()
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    end_time = time.time()
    
    print(f"Response status code: {response.status_code}")
    print(f"Response body: {response.json()}")
    print(f"Time taken: {end_time - start_time:.4f} seconds")

if __name__ == "__main__":
    test_fibonacci_api()