import React, { useState } from "react";
import { Calculator, AlertCircle, Loader2 } from "lucide-react";

function App() {
  const [number, setNumber] = useState<string>("10");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError(null);
    const n = parseInt(number);

    if (isNaN(n)) {
      setError("Please enter a valid number");
      return;
    }

    if (n < 0) {
      setError("Please enter a non-negative number");
      return;
    }

    if (n > 1000) {
      setError("Values above 1000 may take too long to calculate");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://34.131.12.116/fibonacci", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ n }),
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        setError(data.error || "An error occurred during calculation");
      } else {
        setResult(data.fibonacci.toString());
      }
    } catch (err) {
      setError(
        "Failed to connect to the server. Make sure the API is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center mb-6">
          <Calculator className="h-8 w-8 text-indigo-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800">
            Fibonacci Calculator
          </h1>
        </div>

        <p className="text-gray-600 mb-6">
          Calculate the nth number in the Fibonacci sequence using our optimized
          algorithm.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter a value for n:
            </label>
            <input
              type="number"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter a number"
            />
            <p className="text-xs text-gray-500 mt-1">
              Our optimized algorithm can handle large values (up to 1000)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-70 flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Calculating...
              </>
            ) : (
              "Calculate"
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {result !== null && !error && (
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-md">
            <h3 className="text-lg font-medium text-indigo-800 mb-2">
              Result:
            </h3>
            <div className="flex items-center justify-between">
              <span className="text-gray-700">Fibonacci({number}):</span>
              <div className="text-indigo-700">
                <span className="font-bold text-lg">
                  {result.length > 20
                    ? result.substring(0, 10) +
                      "..." +
                      result.substring(result.length - 10)
                    : result}
                </span>
                {result.length > 20 && (
                  <p className="text-xs mt-1">({result.length} digits)</p>
                )}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-indigo-200">
              <p className="text-xs text-gray-600">
                This calculation uses an optimized algorithm on the server for
                large numbers.
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">API Usage:</h3>
          <div className="bg-gray-50 p-3 rounded-md">
            <pre className="text-xs text-gray-800 overflow-x-auto">
              {`POST /fibonacci
Content-Type: application/json

{
  "n": ${number || 10}
}

Response:
{
  "fibonacci": ${
    result !== null
      ? result.length > 30
        ? '"' +
          result.substring(0, 10) +
          "..." +
          result.substring(result.length - 10) +
          '"'
        : result
      : 55
  }
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
