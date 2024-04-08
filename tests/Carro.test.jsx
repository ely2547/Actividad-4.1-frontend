import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Carro from '../src/pages/Carro';

// Mock de localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('Carro Component', () => {
  beforeEach(() => {
    // Limpiar el localStorage antes de cada prueba
    window.localStorage.clear();
  });

  it('debe mostrar "Tu carrito está vacío." si no hay productos en el carrito', () => {
    render(<Carro />);
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
  });

  it('debe permitir agregar y eliminar productos del carrito', () => {
    const productoMock = { _id: '1', name: 'Producto 1', price: 100, cantidad: 1 };
    window.localStorage.setItem('carrito', JSON.stringify([productoMock]));
    render(<Carro />);

    const nombreProducto = screen.getByText(productoMock.name);
    expect(nombreProducto).toBeInTheDocument();

    const botonEliminar = screen.getByText('Eliminar');
    fireEvent.click(botonEliminar);

    expect(nombreProducto).not.toBeInTheDocument();
  });

});
