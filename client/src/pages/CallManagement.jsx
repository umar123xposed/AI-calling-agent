import CallForm from "../components/callForm";
import CallHistory from "../components/callHistory";
import { useCallContext } from "../context/CallContext";
import { DarkModeToggle } from "../components/DarkModeToggle";

function CallManagement() {
  const { callStatus } = useCallContext();

  return (
    <div className="min-h-screen bg-lightBg dark:bg-darkBg">
      {/* Navigation */}
      <nav className="bg-lightBg dark:bg-darkBg shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100 font-heading">
              Call Management
            </h1>
          </div>
          <DarkModeToggle />
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-1">
              <CallForm />
            </div>
            <div className="lg:col-span-1">
              <CallHistory />
            </div>
          </div>

          {callStatus && (
            <div className="mt-6">
              <div className="max-w-3xl mx-auto bg-lightBg dark:bg-darkBg rounded-lg shadow-lg border-l-4 border-primary p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-800 dark:text-gray-200">{callStatus}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CallManagement;
