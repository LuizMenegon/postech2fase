import api from './api';

export const studentsService = {
  // Fazer login
  async login(email, password) {
    try {
      const response = await api.post('/loginStudent', { email, password });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    }
  },

  // Obter estudante por ID
  async getStudentById(id) {
    try {
      const response = await api.get(`/getStudent/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar dados do estudante');
    }
  },

  // Criar novo estudante
  async createStudent(studentData) {
    try {
      const response = await api.post('/createStudent', studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar estudante');
    }
  },

  // Atualizar estudante
  async updateStudent(id, studentData) {
    try {
      const response = await api.put(`/updateStudent/${id}`, studentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar estudante');
    }
  },

  // Deletar estudante
  async deleteStudent(id) {
    try {
      await api.delete(`/deleteStudent/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar estudante');
    }
  },

  // Obter posts de um estudante
  async getPostsByStudentId(id) {
    try {
      const response = await api.get(`/students/${id}/posts`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar posts do estudante');
    }
  },

  // Obter todos os estudantes
  async getAllStudents() {
    try {
      const response = await api.get('/getAllStudents');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar estudantes');
    }
  }
};

export default studentsService;