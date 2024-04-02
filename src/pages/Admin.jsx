import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import ProductForm from './ProductForm';

const Admin = () => {
  // Estado para almacenar la lista de productos
  const [productos, setProductos] = useState([]);
  // Estado para el nuevo producto a agregar
  const [newProducto, setNewProducto] = useState({
    name: '',
    description: '',
    image: null,
    price: 0,
    availability: true,
    quantity: 0,
  });
  // Estado para el producto que se está editando
  const [editingProducto, setEditingProducto] = useState(null);

  // Efecto para cargar los productos al cargar la página
  useEffect(() => {
    axios.get('http://localhost:3000/productos')
      .then(response => {
        setProductos(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  // Función para manejar cambios en los inputs del formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    if (editingProducto) {
      setEditingProducto({ ...editingProducto, [name]: inputValue });
    } else {
      setNewProducto({ ...newProducto, [name]: inputValue });
    }
  };

  // Función para manejar cambios en la selección de archivos
  const handleFileChange = (e) => {
    const { files } = e.target;
    if (editingProducto) {
      setEditingProducto({ ...editingProducto, image: files[0] });
    } else {
      setNewProducto({ ...newProducto, image: files[0] });
    }
  };

  // Función para enviar el formulario y agregar un nuevo producto
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in newProducto) {
      formData.append(key, newProducto[key]);
    }
    axios.post('http://localhost:3000/productos', formData)
      .then(response => {
        setProductos([...productos, response.data]);
        setNewProducto({
          name: '',
          description: '',
          image: null,
          price: 0,
          availability: true,
          quantity: 0,
        });
      })
      .catch(error => {
        console.error('Error al agregar el producto:', error);
      });
  };

  // Función para actualizar un producto existente
  const handleUpdate = (id, e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in editingProducto) {
      formData.append(key, editingProducto[key]);
    }
    axios.put(`http://localhost:3000/productos/${id}`, formData)
      .then(response => {
        setProductos(productos.map(producto => producto._id === id ? response.data : producto));
        setEditingProducto(null);
      })
      .catch(error => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  // Función para eliminar un producto
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/productos/${id}`)
      .then(() => {
        setProductos(productos.filter(producto => producto._id !== id));
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="text-3xl font-bold text-center mb-6">Panel Administrativo</h2>

      {/* Componente del formulario para agregar/editar productos */}
      <ProductForm
        product={editingProducto || newProducto}
        handleSubmit={editingProducto ? (e) => handleUpdate(editingProducto._id, e) : handleSubmit}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        className="space-y-6"
      />

      <h2 className="text-3xl font-bold text-center mt-6 mb-6">Productos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Mapeo de la lista de productos para mostrar en tarjetas */}
        {productos.map((producto) => (
          <motion.div
            key={producto._id}
            className="card w-full bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <figure className="h-48 bg-gray-100">
              <img
                src={`http://localhost:3000/${producto.image}`}
                alt={producto.name}
                className="object-cover h-full w-full"
              />
            </figure>
            <div className="card-body p-4">
              <h3 className="card-title text-gray-900 text-xl font-semibold">{producto.name}</h3>
              <p className="text-gray-700">{producto.description}</p>
              <p className="text-gray-900 font-bold">Precio: {producto.price}</p>
              <p className="text-gray-600">Cantidad: {producto.quantity}</p>
              <p className="text-gray-900">Disponibilidad: {producto.availability ? 'Disponible' : 'No disponible'}</p>
              <div className="card-actions justify-end mt-4">
                {/* Botones para editar y eliminar productos */}
                <button
                  onClick={() => setEditingProducto(producto)}
                  className="btn btn-outline btn-primary mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(producto._id)}
                  className="btn btn-outline btn-error"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* Mostrar formulario de edición si hay un producto en edición */}
      {editingProducto && (
        <ProductForm
          product={editingProducto}
          handleSubmit={(e) => handleUpdate(editingProducto._id, e)}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          className="space-y-6"
        />
      )}
    </motion.div>
  );
};

export default Admin;
