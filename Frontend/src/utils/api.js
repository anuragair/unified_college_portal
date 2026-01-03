// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Helper function to make API requests
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Add authorization token if available
  const token = localStorage.getItem('token');
  if (token) {
    defaultOptions.headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Authentication API
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        loginEmail: email,
        loginPassword: password,
      }),
    });
  },

  verify: async () => {
    return apiRequest('/auth/verify', {
      method: 'GET',
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/src/pages/login.html';
  },
};

// Contact API
export const contactAPI = {
  submit: async (contactData) => {
    return apiRequest('/contact/submit', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },
};

// User API
export const userAPI = {
  getProfile: async () => {
    return apiRequest('/users/profile', {
      method: 'GET',
    });
  },

  updateProfile: async (profileData) => {
    return apiRequest('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
};

// Utility function to check if user is authenticated
export function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// Utility function to get current user
export function getCurrentUser() {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
}
