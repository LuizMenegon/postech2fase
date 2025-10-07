import api from './api';

export const authService = {
  // Login de professor
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  // Verificar token
  async verifyToken() {
    try {
      const response = await api.get('/auth/verify');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Token inválido');
    }
  },

  // Logout
  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      // Mesmo se der erro no backend, limpar dados locais
      console.error('Erro no logout:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },

  // Registrar novo professor (admin only)
  async register(teacherData) {
    try {
      const response = await api.post('/auth/register', teacherData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao registrar professor');
    }
  }
};