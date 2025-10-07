import api from './api';

export const postsService = {
  // Obter todos os posts
  async getAllPosts() {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar posts');
    }
  },

  // Obter post por ID
  async getPostById(id) {
    try {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar post');
    }
  },

  // Criar novo post
  async createPost(postData) {
    try {
      const response = await api.post('/posts', postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar post');
    }
  },

  // Atualizar post
  async updatePost(id, postData) {
    try {
      const response = await api.put(`/posts/${id}`, postData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao atualizar post');
    }
  },

  // Deletar post
  async deletePost(id) {
    try {
      await api.delete(`/posts/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar post');
    }
  },

  // Buscar posts por termo
  async searchPosts(searchTerm) {
    try {
      const response = await api.get(`/posts/search?q=${encodeURIComponent(searchTerm)}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao buscar posts');
    }
  }
};

export const commentsService = {
  // Obter comentários de um post
  async getCommentsByPostId(postId) {
    try {
      const response = await api.get(`/posts/${postId}/comments`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao carregar comentários');
    }
  },

  // Criar comentário
  async createComment(postId, commentData) {
    try {
      const response = await api.post(`/posts/${postId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao criar comentário');
    }
  },

  // Deletar comentário
  async deleteComment(commentId) {
    try {
      await api.delete(`/comments/${commentId}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Erro ao deletar comentário');
    }
  }
};