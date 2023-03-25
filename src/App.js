import React from 'react';
import TodoList from './components/TodoList';
import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import { Route, Routes } from 'react-router';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="todo-app">
      <AuthContextProvider>
        <Routes>
          <Route path='/' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />

          <Route path='/account' element={
            <ProtectedRoute>
              <TodoList />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
