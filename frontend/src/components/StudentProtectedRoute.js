import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import Loading from './Loading';

const StudentProtectedRoute = ({ children }) => {
  const { student, isAuthenticated, loading } = useStudentAuth();

  if (loading) {
    return <Loading text="Verificando autenticação..." />;
  }

  if (!isAuthenticated || !student) {
    return <Navigate to="/student-login" replace />;
  }

  return children;
};

export default StudentProtectedRoute;