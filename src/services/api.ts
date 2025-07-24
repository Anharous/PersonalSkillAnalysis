import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  signup: (name: string, email: string, password: string) =>
    api.post('/auth/signup', { name, email, password }),
  
  validateToken: () =>
    api.post('/auth/validate'),
};

// User API
export const userAPI = {
  getProfile: (userId: string) =>
    api.get(`/users/${userId}`),
  
  updateProfile: (userId: string, data: any) =>
    api.put(`/users/${userId}`, data),
  
  getAllUsers: () =>
    api.get('/users'),
  
  getUsersByRole: (role: string) =>
    api.get(`/users/role/${role}`),
  
  uploadResume: (userId: string, file: FormData) =>
    api.post(`/users/${userId}/resume`, file, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
};

// Quiz API
export const quizAPI = {
  getAllQuizzes: () =>
    api.get('/quizzes'),
  
  getQuizById: (quizId: string) =>
    api.get(`/quizzes/${quizId}`),
  
  getQuizzesBySkills: (skills: string[]) =>
    api.get('/quizzes/by-skills', { params: { skills } }),
  
  startQuiz: (quizId: string, userId: string) =>
    api.post(`/quizzes/${quizId}/start`, null, { params: { userId } }),
  
  submitQuiz: (attemptId: string, attempt: any) =>
    api.post(`/quizzes/attempts/${attemptId}/submit`, attempt),
  
  getUserAttempts: (userId: string) =>
    api.get(`/quizzes/users/${userId}/attempts`),
  
  getUserQuizAttempt: (userId: string, quizId: string) =>
    api.get(`/quizzes/users/${userId}/attempts/${quizId}`),
};

// Learning Module API
export const learningAPI = {
  getAllModules: () =>
    api.get('/learning-modules'),
  
  getModulesBySkills: (skills: string[]) =>
    api.get('/learning-modules/by-skills', { params: { skills } }),
  
  getUserProgress: (userId: string) =>
    api.get(`/learning-modules/users/${userId}/progress`),
  
  updateProgress: (userId: string, moduleId: string, progress: any) =>
    api.put(`/learning-modules/users/${userId}/progress/${moduleId}`, progress),
  
  completeModule: (userId: string, moduleId: string) =>
    api.post(`/learning-modules/users/${userId}/complete/${moduleId}`),
};

// Admin API
export const adminAPI = {
  getDashboardStats: () =>
    api.get('/admin/dashboard/stats'),
  
  getAllUsers: () =>
    api.get('/admin/users'),
  
  getUserAnalytics: () =>
    api.get('/admin/analytics/users'),
  
  getQuizAnalytics: () =>
    api.get('/admin/analytics/quizzes'),
  
  getLearningAnalytics: () =>
    api.get('/admin/analytics/learning'),
  
  generateReport: (type: string, period: string) =>
    api.get(`/admin/reports/${type}`, { params: { period } }),
};

export default api;