import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductForm from '../src/pages/ProductForm';

describe('ProductForm', () => {
  let productMock;
  let handleSubmitMock;
  let handleInputChangeMock;
  let handleFileChangeMock;

  beforeEach(() => {
    productMock = { name: '', description: '', price: '', quantity: '', availability: false };
    handleSubmitMock = jest.fn();
    handleInputChangeMock = jest.fn();
    handleFileChangeMock = jest.fn();
    render(
      <ProductForm
        product={productMock}
        handleSubmit={handleSubmitMock}
        handleInputChange={handleInputChangeMock}
        handleFileChange={handleFileChangeMock}
      />
    );
  });

  it('renders correctly', () => {
    expect(screen.getByPlaceholderText('Introduce el nombre del producto')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Introduce una descripción')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Introduce el precio')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Introduce la cantidad')).toBeInTheDocument();
    expect(screen.getByLabelText('Disponibilidad:')).toBeInTheDocument();
  });

});

export default ProductForm;
