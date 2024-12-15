import axios from "axios";

// Create an instance of axios with custom configurations
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000", // Use environment variable for API URL in production
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to include Authorization token
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token"); // Retrieve token from localStorage
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`; // Attach token to headers
        }
        return config; // Proceed with the request
    },
    (error) => {
        return Promise.reject(error); // Handle request error
    }
);

// Optional: Add response interceptor for global error handling
axiosInstance.interceptors.response.use(
    (response) => response, // Return the response as is
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optional: Handle unauthorized requests, maybe redirect to login
            console.error("Unauthorized access, please log in again.");
        }
        return Promise.reject(error); // Reject the error
    }
);

export default axiosInstance;
