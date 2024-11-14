import axios from "axios";
import api from "../config/axios";

export const getRegistrationForms = async () => {
    try {
      const response = await api.get('registrationForm/getAllRegistrationForm');
      if (response.status !== 200) {
        throw new Error('Network response was not ok');
      }
      return response.data;
    } catch (error) {
      console.error("There was an error fetching the registration forms:", error);
      return [];
    }
  };

  export const acceptRegistrationForm = async (registrationId) => {
    try {
      const response = await api.put(`/registrationForm/acceptRegisForm/${registrationId}`);
  
      if (!response.status === 200) {
        throw new Error('Failed to accept registration form');
      }
  
      return await response.data;
    } catch (error) {
      console.error("Error in accepting registration form:", error);
      throw error;
    }
  };
  