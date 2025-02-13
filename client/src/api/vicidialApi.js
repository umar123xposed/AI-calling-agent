import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const startCall = async (phoneNumber, firstName, lastName) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/vicidial/call`, {
      phone_number: phoneNumber,
      first_name: firstName,
      last_name: lastName,
    });
    return response.data;
  } catch (error) {
    console.error("Error starting call:", error);
    throw error;
  }
};
