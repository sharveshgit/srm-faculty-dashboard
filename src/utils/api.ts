// Frontend API utility for backend calls

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// ============ AUTHENTICATION ============

export const registerUser = async (username: string, password: string, email: string, role: 'faculty' | 'hod') => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, email, role }),
  });

  if (!response.ok) throw new Error('Registration failed');
  return response.json();
};

export const loginUser = async (username: string, password: string, role: 'faculty' | 'hod') => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role }),
  });

  if (!response.ok) throw new Error('Login failed');
  const data = await response.json();
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('auth_user', JSON.stringify(data.user));
  return data.user;
};

export const logoutUser = async () => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  localStorage.removeItem('auth_token');
  localStorage.removeItem('auth_user');
};

export const getToken = () => localStorage.getItem('auth_token');
export const getUser = () => {
  const user = localStorage.getItem('auth_user');
  return user ? JSON.parse(user) : null;
};

// ============ PROFILE ============

export const getFacultyProfile = async () => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_URL}/api/faculty/profile`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
};

export const getHODProfile = async () => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_URL}/api/hod/profile`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Failed to fetch profile');
  return response.json();
};

export const getHODFacultyList = async () => {
  const token = getToken();
  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_URL}/api/hod/faculty-list`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Failed to fetch faculty list');
  return response.json();
};

// ============ HEALTH CHECK ============

export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
};
