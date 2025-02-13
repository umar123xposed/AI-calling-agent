import { useEffect, useState } from "react";
import axios from "axios";
import { DarkModeToggle } from "../components/DarkModeToggle";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function Transcripts() {
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTranscripts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/transcripts`);
        setTranscripts(response.data);
      } catch (error) {
        console.error("Error fetching transcripts:", error);
      }
      setLoading(false);
    };

    fetchTranscripts();
  }, []);

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg">
      {/* Navigation */}
      <nav className="bg-lightBg dark:bg-darkBg shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-heading">Call Transcripts</h1>
          <DarkModeToggle />
        </div>
      </nav>

      {/* Header Section */}
      <div className="relative bg-gradient-to-b from-primary to-darkBg pb-32 pt-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90 opacity-80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-8 sm:py-12 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary font-heading">
              Call Transcripts
            </h1>
            <p className="mt-4 text-lg text-gray-200">
              Review and analyze your conversation history
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="relative -mt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              <span className="ml-3 text-lg text-gray-600 dark:text-gray-300">Loading transcripts...</span>
            </div>
          ) : transcripts.length === 0 ? (
            <div className="max-w-2xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl bg-lightBg dark:bg-darkBg p-12 text-center border border-gray-300 dark:border-gray-600">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
                <div className="relative">
                  <svg className="mx-auto h-16 w-16 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
                    No transcripts available
                  </h3>
                  <p className="mt-2 text-gray-500">
                    Start making calls to generate transcripts
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-2xl bg-lightBg dark:bg-darkBg border border-gray-300 dark:border-gray-600">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent" />
              <div className="relative divide-y divide-gray-300 dark:divide-gray-600">
                {transcripts.map((transcript) => (
                  <div key={transcript._id} className="p-6 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                          {transcript.phone_number}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(transcript.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-900/50 text-green-400">
                        Completed
                      </span>
                    </div>
                    <div className="bg-lightBg dark:bg-gray-900 rounded-lg p-4">
                      <div className="flex items-start">
                        <svg className="h-5 w-5 text-gray-500 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        <p className="ml-3 text-gray-700 dark:text-gray-300 leading-relaxed">
                          {transcript.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Transcripts;
