import React, { createContext, useContext, useReducer } from 'react';

const PostsContext = createContext();

const initialState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
  searchTerm: '',
  filteredPosts: []
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload,
        filteredPosts: action.payload,
        loading: false,
        error: null
      };
    case 'SET_CURRENT_POST':
      return {
        ...state,
        currentPost: action.payload,
        loading: false,
        error: null
      };
    case 'ADD_POST':
      const newPosts = [action.payload, ...state.posts];
      const newFilteredPosts = state.searchTerm ? 
        newPosts.filter(post => 
          post.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          post.content.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
          post.author.toLowerCase().includes(state.searchTerm.toLowerCase())
        ) : newPosts;
      return {
        ...state,
        posts: newPosts,
        filteredPosts: newFilteredPosts,
        loading: false,
        error: null
      };
    case 'UPDATE_POST':
      const updatedPosts = state.posts.map(post =>
        post.ID === action.payload.ID || post.id === action.payload.id || post.ID === action.payload.id || post.id === action.payload.ID ? action.payload : post
      );
      return {
        ...state,
        posts: updatedPosts,
        filteredPosts: state.searchTerm ? 
          updatedPosts.filter(post => 
            post.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(state.searchTerm.toLowerCase())
          ) : updatedPosts,
        currentPost: (state.currentPost?.id === action.payload.id || state.currentPost?.ID === action.payload.ID || state.currentPost?.id === action.payload.ID || state.currentPost?.ID === action.payload.id) ? action.payload : state.currentPost,
        loading: false,
        error: null
      };
    case 'DELETE_POST':
      const remainingPosts = state.posts.filter(post => (post.ID || post.id) !== action.payload);
      return {
        ...state,
        posts: remainingPosts,
        filteredPosts: state.searchTerm ? 
          remainingPosts.filter(post => 
            post.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            post.content.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            post.author.toLowerCase().includes(state.searchTerm.toLowerCase())
          ) : remainingPosts,
        currentPost: state.currentPost?.id === action.payload ? null : state.currentPost,
        loading: false,
        error: null
      };
    case 'SET_SEARCH_TERM':
      const searchTerm = action.payload.toLowerCase();
      const filtered = searchTerm ? 
        state.posts.filter(post => 
          post.title.toLowerCase().includes(searchTerm) ||
          post.content.toLowerCase().includes(searchTerm) ||
          post.author.toLowerCase().includes(searchTerm)
        ) : state.posts;
      return {
        ...state,
        searchTerm: action.payload,
        filteredPosts: filtered
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    case 'CLEAR_CURRENT_POST':
      return {
        ...state,
        currentPost: null
      };
    default:
      return state;
  }
};

export const PostsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, initialState);

  // Inicializar com posts padrão apenas uma vez
  React.useEffect(() => {
    if (state.posts.length === 0) {
      const initialPosts = [
        {
          ID: 1,
          id: 1,
          title: 'Bem-vindos ao Blog da POSTECH',
          content: 'Este é o primeiro post do nosso blog acadêmico. Aqui compartilharemos conhecimentos, experiências e descobertas do mundo da tecnologia e inovação.',
          author: 'Prof. Silva',
          authorType: 'teacher',
          createdAt: new Date('2024-01-01'),
        },
        {
          ID: 2,
          id: 2,
          title: 'Inteligência Artificial na Educação',
          content: 'A inteligência artificial está revolucionando a forma como ensinamos e aprendemos. Neste post, exploramos as principais aplicações da IA no contexto educacional.',
          author: 'Prof. Maria Santos',
          authorType: 'teacher',
          createdAt: new Date('2024-01-02'),
        },
        {
          ID: 3,
          id: 3,
          title: 'Desenvolvimento Full Stack Moderno',
          content: 'O desenvolvimento full stack evoluiu significativamente nos últimos anos. Discutimos as principais tecnologias e frameworks.',
          author: 'Prof. João Oliveira',
          authorType: 'teacher',
          createdAt: new Date('2024-01-03'),
        }
      ];
      
      dispatch({ type: 'SET_POSTS', payload: initialPosts });
    }
  }, [state.posts.length]);

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const setPosts = (posts) => {
    dispatch({ type: 'SET_POSTS', payload: posts });
  };

  const setCurrentPost = (post) => {
    dispatch({ type: 'SET_CURRENT_POST', payload: post });
  };

  const addPost = (post) => {
    dispatch({ type: 'ADD_POST', payload: post });
  };

  const updatePost = (post) => {
    dispatch({ type: 'UPDATE_POST', payload: post });
  };

  const deletePost = (postId) => {
    dispatch({ type: 'DELETE_POST', payload: postId });
  };

  const setSearchTerm = (term) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const clearCurrentPost = () => {
    dispatch({ type: 'CLEAR_CURRENT_POST' });
  };

  const value = {
    ...state,
    setLoading,
    setError,
    setPosts,
    setCurrentPost,
    addPost,
    updatePost,
    deletePost,
    setSearchTerm,
    clearError,
    clearCurrentPost
  };

  return (
    <PostsContext.Provider value={value}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostsContext);
  if (!context) {
    throw new Error('usePosts deve ser usado dentro de um PostsProvider');
  }
  return context;
};