// Login page functionality
import { authAPI, getCurrentUser } from '../utils/api.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('.login-box');
  const usernameInput = loginForm?.querySelector('input[type="text"]');
  const passwordInput = loginForm?.querySelector('input[type="password"]');
  const loginButton = loginForm?.querySelector('button');
  const forgotPasswordLink = loginForm?.querySelector('.forgot');

  // Check if user is already logged in
  const currentUser = getCurrentUser();
  if (currentUser) {
    // Redirect based on user type
    const userType = currentUser.userType?.toLowerCase();
    const redirectMap = {
      'student': '../pages/student.html',
      'faculty': '../pages/faculty.html',
      'admin': '../pages/admin.html',
      'parent': '../pages/dashboard.html'
    };
    
    const redirectPath = redirectMap[userType] || '../pages/dashboard.html';
    window.location.href = redirectPath;
    return;
  }

  // Handle login form submission
  if (loginButton) {
    loginButton.addEventListener('click', async (e) => {
      e.preventDefault();
      
      const username = usernameInput?.value.trim();
      const password = passwordInput?.value;

      if (!username || !password) {
        alert('Please enter both username and password');
        return;
      }

      try {
        loginButton.disabled = true;
        loginButton.textContent = 'LOGGING IN...';

        const response = await authAPI.login(username, password);
        
        if (response.success) {
          // Store token and user data
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          
          // Redirect based on user type
          const userType = response.data.user.userType?.toLowerCase();
          const redirectMap = {
            'student': '../pages/student.html',
            'faculty': '../pages/faculty.html',
            'admin': '../pages/admin.html',
            'parent': '../pages/dashboard.html'
          };
          
          const redirectPath = redirectMap[userType] || '../pages/dashboard.html';
          window.location.href = redirectPath;
        }
      } catch (error) {
        alert(error.message || 'Login failed. Please check your credentials.');
        passwordInput.value = '';
      } finally {
        loginButton.disabled = false;
        loginButton.textContent = 'LOGIN';
      }
    });
  }

  // Handle Enter key press
  if (passwordInput) {
    passwordInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        loginButton?.click();
      }
    });
  }

  // Handle forgot password (placeholder)
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Password reset functionality coming soon. Please contact administrator.');
    });
  }
});
