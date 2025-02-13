import { useState } from "react";
import axios from "axios";
import { useCallContext } from "../context/CallContext";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

function CallForm() {
  const [formData, setFormData] = useState({ phone_number: "" });
  const [loading, setLoading] = useState(false);
  const { setCallStatus } = useCallContext();

  const handleChange = (e) => {
    setFormData({ ...formData, phone_number: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/vicidial/call`, formData);
      if (response.data.success) {
        setCallStatus(`Calling ${formData.phone_number}...`);
      } else {
        setCallStatus("Call failed.");
      }
    } catch (error) {
      console.error("Error initiating call:", error);
      setCallStatus("Call failed.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-lightBg dark:bg-darkBg rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="flex-shrink-0 bg-blue-100 rounded-md p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1"
              />
            </svg>
          </div>
          <h2 className="ml-3 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Start a Call
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <div className="mt-1">
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                placeholder="Enter phone number"
                value={formData.phone_number}
                onChange={handleChange}
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md bg-lightBg dark:bg-darkBg text-gray-900 dark:text-gray-100"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition duration-300 ${
              loading ? "opacity-75 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Initiating Call...
              </span>
            ) : (
              "Start Call"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CallForm;
