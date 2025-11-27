import axios from 'axios';

// Create axios instance with base configuration
export const api = axios.create({
    baseURL: 'http://localhost:8080', // Backend base URL
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
    (config) => {
        // You can add authorization headers here if needed
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors here
        if (error.response) {
            // Server responded with error status
            console.error('API Error:', error.response.data);
        } else if (error.request) {
            // Request was made but no response received
            console.error('Network Error:', error.message);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        return Promise.reject(error);
    }
);

// User API methods with exact backend endpoints
export const userAPI = {
    // Fetch all users
    getAll: () => api.get('/student/getAll'),

    // Fetch user by ID
    getById: (id) => api.get(`/student/${id}`),

    // Create new user - POST /student/Add-Student
    create: (userData) => api.post('/student/Add-Student', userData),

    // Update user - PUT /student/update-Student
    update: (id, userData) => api.put('/student/update-Student', userData),

    // Delete user - DELETE /Student-Delete/{id}
    delete: (id) => api.delete(`/Student-Delete/${id}`),
};

export default api;