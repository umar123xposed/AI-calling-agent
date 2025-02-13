import { Link } from "react-router-dom";
import { DarkModeToggle } from "../components/DarkModeToggle";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
                AI Outbound Calling System
              </h1>
            </div>
            <DarkModeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          {/* Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              Welcome to Your Dashboard
            </h2>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Manage your calls and access transcripts with ease through our intuitive interface.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Manage Calls Card */}
            <Link
              to="/call-management"
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="p-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-50 dark:bg-blue-900/30 rounded-xl p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1" />
                      </svg>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        Manage Calls
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Make calls and track your call history effortlessly through our streamlined interface.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            {/* View Transcripts Card */}
            <Link
              to="/transcripts"
              className="group relative"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-xl border border-gray-100 dark:border-gray-700">
                <div className="p-8">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        View Transcripts
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Access and analyze your call transcripts with our powerful transcript management system.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;