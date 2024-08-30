import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Implement refresh token logic here if needed
      // const refreshToken = localStorage.getItem('refreshToken');
      // const res = await refreshAuth(refreshToken);
      // if (res.data.token) {
      //   localStorage.setItem('authToken', res.data.token);
      //   api.defaults.headers['Authorization'] = `Bearer ${res.data.token}`;
      //   return api(originalRequest);
      // }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const signup = async (userData) => {
  try {
    const response = await api.post('/user/signup', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/user/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

export const getProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

export const updatePassword = async (currentPassword, newPassword) => {
  try {
    const response = await api.put('/user/profile/password', { currentPassword, newPassword });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Invalid current password');
    }
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

// User APIs
export const getUsers = async () => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

// Candidate APIs
export const getCandidates = async () => {
  try {
    const response = await api.get('/candidate');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching candidates');
  }
};

export const addCandidate = async (candidateData) => {
  try {
    const response = await api.post('/candidate', candidateData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

// Voting APIs
export const voteForCandidate = async (candidateId) => {
  try {
    const response = await api.post(`/candidate/vote/${candidateId}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      throw new Error('You have already voted.');
    }
    throw new Error(error.response?.data?.message || 'Error voting for candidate');
  }
};

export const getVoteCounts = async () => {
  try {
    const response = await api.get('/candidate/vote/count');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

// Admin APIs (if needed)
export const deleteUser = async (userId) => {
  try {
    const response = await api.delete(`/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

export const deleteCandidate = async (candidateId) => {
  try {
    const response = await api.delete(`/candidate/${candidateId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Network Error');
  }
};

export default api;