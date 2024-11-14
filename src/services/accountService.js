import api from "../config/axios";

export const addTransaction = async (params) => {
  try {
    const transaction = await api.post('/transaction/addTransaction', null, { withCredentials: true,
       params});
    return transaction;
  } catch (error) {
    console.error("Error in accepting registration form:", error);
      throw error;
  }
}