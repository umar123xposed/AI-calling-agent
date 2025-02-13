import { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function CallHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/call-history`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching call history:", error);
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  return (
    <div className="bg-lightBg dark:bg-darkBg rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 bg-green-100 rounded-md p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Call History
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-green-500"></div>
            <span className="ml-3 text-sm text-gray-500 dark:text-gray-400">
              Loading call history...
            </span>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
              No recent calls
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Start making calls to see your history
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {history.map((call) => (
              <div key={call._id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {call.phone_number}
                    </p>
                    <div className="mt-1 flex items-center space-x-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          call.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : call.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {call.status}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(call.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 text-gray-400 hover:text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CallHistory;
