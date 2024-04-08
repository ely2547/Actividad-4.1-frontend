import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterPage from '../src/pages/Register';
import { BrowserRouter } from 'react-router-dom';
import { AuthContext } from '../src/context/AuthContext';

// Mock de funciones de AuthContext
const mockSignup = jest.fn();
const mockNavigate = jest.fn();

// Wrapper para incluir el contexto y el router en las pruebas
const Wrapper = ({ children }) => (
  <AuthContext.Provider value={{ signup: mockSignup, isAuthenticated: false, errors: [] }}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </AuthContext.Provider>
);

describe('RegisterPage', () => {
  it('debe renderizar el formulario de registro', () => {
    render(<RegisterPage />, { wrapper: Wrapper });
    expect(screen.getByPlaceholderText('Nombre de usuario')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Registrarse' })).toBeInTheDocument();
  });

  it('debe permitir al usuario introducir datos en los campos del formulario', () => {
    render(<RegisterPage />, { wrapper: Wrapper });
    fireEvent.change(screen.getByPlaceholderText('Nombre de usuario'), { target: { value: 'usuario' } });
    fireEvent.change(screen.getByPlaceholderText('Correo electrónico'), { target: { value: 'usuario@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'contraseña123' } });
    expect(screen.getByPlaceholderText('Nombre de usuario')).toHaveValue('usuario');
    expect(screen.getByPlaceholderText('Correo electrónico')).toHaveValue('usuario@example.com');
    expect(screen.getByPlaceholderText('Contraseña')).toHaveValue('contraseña123');
  });

});

