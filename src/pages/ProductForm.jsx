import React from 'react';

// Componente para renderizar un formulario para agregar o actualizar un producto
const ProductForm = ({ product, handleSubmit, handleInputChange, handleFileChange }) => {
  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="space-y-6 p-6 bg-gray-400 shadow-xl rounded-lg w-full max-w-lg">
        {/* Campo de entrada para el nombre del producto */}
        <div className="form-control">
          <label className="label" htmlFor="name">
            <span className="label-text">Nombre del producto</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Introduce el nombre del producto"
            className="input input-bordered w-full"
          />
        </div>
        {/* Campo de entrada para la descripción del producto */}
        <div className="form-control">
          <label className="label" htmlFor="description">
            <span className="label-text">Descripción del producto</span>
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            placeholder="Introduce una descripción"
            className="input input-bordered w-full"
          />
        </div>
        {/* Campo de entrada para la imagen del producto */}
        <div className="form-control">
          <label className="label" htmlFor="image">
            <span className="label-text">Imagen del producto</span>
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="input input-bordered w-full file:btn file:btn-primary"
          />
        </div>
        {/* Campo de entrada para el precio del producto */}
        <div className="form-control">
          <label className="label" htmlFor="price">
            <span className="label-text">Precio del producto</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            placeholder="Introduce el precio"
            className="input input-bordered w-full"
          />
        </div>
        {/* Campo de entrada para la cantidad del producto */}
        <div className="form-control">
          <label className="label" htmlFor="quantity">
            <span className="label-text">Cantidad del producto</span>
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={product.quantity}
            onChange={handleInputChange}
            placeholder="Introduce la cantidad"
            className="input input-bordered w-full"
          />
        </div>
        {/* Checkbox para la disponibilidad del producto */}
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-2" htmlFor="availability">
            <span className="label-text">Disponibilidad:</span>
            <input
              type="checkbox"
              id="availability"
              name="availability"
              checked={product.availability}
              onChange={handleInputChange}
              className="toggle toggle-accent"
            />
          </label>
        </div>
        {/* Botón para enviar el formulario */}
        <button
          type="submit"
          className="btn btn-primary w-full py-3 text-lg bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          {product._id ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
