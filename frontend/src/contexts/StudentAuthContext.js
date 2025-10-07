import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentAuthContext = createContext();

export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error('useStudentAuth must be used within a StudentAuthProvider');
  }
  return context;
};

export const StudentAuthProvider = ({ children }) => {
  const [student, setStudent] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há dados de autenticação salvos no localStorage
    const savedStudent = localStorage.getItem('studentAuth');
    if (savedStudent) {
      try {
        const studentData = JSON.parse(savedStudent);
        setStudent(studentData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao carregar dados de autenticação do estudante:', error);
        localStorage.removeItem('studentAuth');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock de autenticação para demonstração
      const mockStudents = {
        'ana.silva@aluno.postech.com': {
          ID: 1,
          name: 'Ana Silva',
          email: 'ana.silva@aluno.postech.com',
          studentId: 'EST001',
          course: 'Engenharia de Software'
        },
        'carlos.santos@aluno.postech.com': {
          ID: 2,
          name: 'Carlos Santos',
          email: 'carlos.santos@aluno.postech.com',
          studentId: 'EST002',
          course: 'Ciência de Dados'
        },
        'maria.oliveira@aluno.postech.com': {
          ID: 3,
          name: 'Maria Oliveira',
          email: 'maria.oliveira@aluno.postech.com',
          studentId: 'EST003',
          course: 'Arquitetura de Software'
        }
      };

      const studentData = mockStudents[email];
      
      if (studentData && password === '123456') {
        setStudent(studentData);
        setIsAuthenticated(true);
        localStorage.setItem('studentAuth', JSON.stringify(studentData));
        return { success: true, user: studentData };
      } else {
        throw new Error('Credenciais inválidas');
      }

      // Código para API real (comentado até backend estar pronto)
      // const response = await fetch('/api/loginStudent', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ email, password }),
      // });

      // if (!response.ok) {
      //   throw new Error('Credenciais inválidas');
      // }

      // const data = await response.json();
      // setStudent(data.user);
      // setIsAuthenticated(true);
      // localStorage.setItem('studentAuth', JSON.stringify(data.user));
      // return { success: true, user: data.user };
      
    } catch (error) {
      console.error('Erro no login do estudante:', error);
      throw error;
    }
  };

  const logout = () => {
    setStudent(null);
    setIsAuthenticated(false);
    localStorage.removeItem('studentAuth');
  };

  const value = {
    student,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <StudentAuthContext.Provider value={value}>
      {children}
    </StudentAuthContext.Provider>
  );
};

export default StudentAuthContext;