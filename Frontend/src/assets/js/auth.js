// Shared authentication helpers
import { authAPI, isAuthenticated, getCurrentUser } from '../utils/api.js';

// Check authentication status and redirect if not logged in
export function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = '../pages/login.html';
    return false;
  }
  return true;
}

// Get current authenticated user
export function getAuthUser() {
  return getCurrentUser();
}

// Logout function
export function logout() {
  authAPI.logout();
}

// Verify token on page load
export async function verifyAuth() {
  if (!isAuthenticated()) {
    return false;
  }

  try {
    const response = await authAPI.verify();
    if (response.success) {
      // Update user data if needed
      localStorage.setItem('user', JSON.stringify(response.data.user));
      return true;
    }
  } catch (error) {
    // Token is invalid, clear storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return false;
  }

  return false;
}

// Initialize auth check on page load
export function initAuth() {
  // For pages that require authentication
  const currentPath = window.location.pathname;
  const publicPages = ['/login.html', '/index.html', '/'];
  const isPublicPage = publicPages.some(page => currentPath.includes(page));

  if (!isPublicPage) {
    if (!requireAuth()) {
      return;
    }
    
    // Verify token is still valid
    verifyAuth().then(isValid => {
      if (!isValid) {
        window.location.href = '../pages/login.html';
      }
    });
  }
}
