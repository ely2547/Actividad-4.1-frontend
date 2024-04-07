import React from 'react';
import { render } from '@testing-library/react';
import App from '../src/App';

describe('App component', () => {
  test('renders routes', () => {
    const { getByText } = render(
      <App />
    );

    // Verifica que se renderizan las rutas
    expect(getByText('Inicio')).toBeInTheDocument();
    expect(getByText('MiComponente')).toBeInTheDocument();
    expect(getByText('Iniciar sesión')).toBeInTheDocument();
    expect(getByText('Registrarse')).toBeInTheDocument();
    expect(getByText('Encuesta')).toBeInTheDocument();
    expect(getByText('Administrador')).toBeInTheDocument();
    expect(getByText('Carrito')).toBeInTheDocument();
  });
});
