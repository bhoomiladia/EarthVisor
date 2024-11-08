import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Change to your backend URL if needed
});

export default api;
export const fetchEmissions = async () => {
    try {
      const response = await api.get('/emissions');
      return response.data;
    } catch (error) {
      console.error("Error fetching emissions data:", error);
      return [];
    }
  };
  