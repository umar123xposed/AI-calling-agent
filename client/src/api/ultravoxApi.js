import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const getTranscripts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/ultravox/transcripts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching transcripts:", error);
    throw error;
  }
};
