import axios from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production' 
    ? '/api' 
    : 'http://localhost:5000/api';

const API_URL = `${BASE_URL}/flight`;

const searchFlights = async (searchData) => {
    try {
        console.log('Sending request to:', `${API_URL}/search`);
        console.log('Request params:', searchData);

        const response = await axios({
            method: 'GET',
            url: `${API_URL}/search`,
            params: searchData,
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log('Response received:', response.data);

        if (!response.data || !response.data.flights) {
            throw new Error('Invalid response format from server');
        }

        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        
        if (error.response) {
            throw new Error(error.response.data.message || 'Server error');
        } else if (error.request) {
            throw new Error('No response from server. Please check your connection.');
        } else {
            throw new Error('Error setting up request: ' + error.message);
        }
    }
};

export default {
    searchFlights
}; 