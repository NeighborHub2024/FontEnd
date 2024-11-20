import axios from "axios";


const headersPayos = {
  headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'x-client-id': 'ac7221c8-dee5-4b59-826f-ee91f20e1421',
            'x-api-key': '406a04cc-3e36-4569-a810-9db046de527a',
          }
}

export const payOsService = {
  createPayment: async (requestBody) => {
    try {
      const response = await axios.post('https://api-merchant.payos.vn/v2/payment-requests', requestBody, headersPayos);
      return response;
    } catch (error) {
      console.error("Error in accepting registration form:", error);
      throw error;
    }
  }
}