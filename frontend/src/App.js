import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles/GlobalStyles';
import { AuthProvider } from './contexts/AuthContext';
import { StudentAuthProvider } from './contexts/StudentAuthContext';
import { PostsProvider } from './contexts/PostsContext';
import ProtectedRoute from './components/ProtectedRoute';
import StudentProtectedRoute from './components/StudentProtectedRoute';

// Páginas
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Admin from './pages/Admin';
import Login from './pages/Login';

// Páginas dos Estudantes
import StudentLogin from './pages/StudentLogin';
import StudentDashboard from './pages/StudentDashboard';
import StudentCreatePost from './pages/StudentCreatePost';
import StudentEditPost from './pages/StudentEditPost';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <StudentAuthProvider>
          <PostsProvider>
            <Router>
              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/students/login" element={<StudentLogin />} />
                
                {/* Rotas protegidas para professores */}
                <Route 
                  path="/create" 
                  element={
                    <ProtectedRoute>
                      <CreatePost />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <EditPost />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Rotas para estudantes */}
                <Route 
                  path="/student-dashboard" 
                  element={
                    <StudentProtectedRoute>
                      <StudentDashboard />
                    </StudentProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/create-post" 
                  element={
                    <StudentProtectedRoute>
                      <StudentCreatePost />
                    </StudentProtectedRoute>
                  } 
                />
                <Route 
                  path="/student/edit-post/:id" 
                  element={
                    <StudentProtectedRoute>
                      <StudentEditPost />
                    </StudentProtectedRoute>
                  } 
                />
                
                {/* Rota 404 - redireciona para home */}
                <Route path="*" element={<Home />} />
              </Routes>
            </Router>
          </PostsProvider>
        </StudentAuthProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;