import { toast } from "react-toastify";
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

export const cancelTransaction = async (transactionId) => {
  try {
    const transaction = await api.delete(`/transaction/cancelTransaction/${transactionId}`);
    return transaction;
  } catch (error) {
    console.error("Error in accepting registration form:", error);
      throw error;
  }
}

export const checkPhone = async (phone) => {
    try {
      const response = await api.get(`/user/getByPhoneNumber/${phone}`);
      if (response.data === "User has exist") {
          return true;
      }
    } catch (error) {
      console.error('Phone number check failed:', error);
      return false;
    }
};

export const sendOTP = async (phone) => {
  try {
    const response = await api.post(`/OTP/start-verification?toPhoneNumber=${phone}`);
    if(response.status === 200) {
      return response;
    } else {
      toast.error('Failed to send OTP. Please try again.');
    }
  } catch (error) {
    console.error('Phone number check failed:', error);
  }
};

export const verifyOTP = async (phone, otp) => {
  try {
    const response = await api.post(`/OTP/check-verification?toPhoneNumber=${phone}&code=${otp}`);
    if(response.status === 200) {
      return response;
    } else {
      toast.error('Failed to verify OTP. Please try again.');
    }
  } catch (error) {
    console.error('Phone number check failed:', error);
  }
  return null;
};

export const register = async (requestBody) => {
  try {
    const response = await api.post('/auth/register', requestBody);
    return response;
  } catch (error) {
    console.error("Error in accepting registration form:", error);
      throw error;
  }
}