import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'employee' | 'admin';
  profileComplete: boolean;
  skills: string[];
  currentRole: string;
  desiredRole: string;
  xp: number;
  level: number;
  badges: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token and validate
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      // Validate token with backend
      authAPI.validateToken()
        .then(response => {
          setUser(JSON.parse(savedUser));
        })
        .catch(() => {
          // Token invalid, clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await authAPI.login(email, password);
      const { token, user: userData } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Convert backend user format to frontend format
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role.toLowerCase(),
        profileComplete: userData.profileComplete,
        skills: userData.skills || [],
        currentRole: userData.currentRole || '',
        desiredRole: userData.desiredRole || '',
        xp: userData.xp || 0,
        level: userData.level || 1,
        badges: userData.badges || []
      };
      
      setUser(user);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const response = await authAPI.signup(name, email, password);
      const { token, user: userData } = response.data;
      
      // Store token and user data
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Convert backend user format to frontend format
      const user: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role.toLowerCase(),
        profileComplete: userData.profileComplete,
        skills: userData.skills || [],
        currentRole: userData.currentRole || '',
        desiredRole: userData.desiredRole || '',
        xp: userData.xp || 0,
        level: userData.level || 1,
        badges: userData.badges || []
      };
      
      setUser(user);
      return true;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update user in backend
      userAPI.updateProfile(user.id, updates).catch(console.error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}