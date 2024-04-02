import React, { useState, useEffect } from 'react'; 
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import { motion } from 'framer-motion'; 

// Componente funcional ReviewForm para agregar reseñas
const ReviewForm = ({ productoId, fetchReviews }) => {
  const [review, setReview] = useState({ user: '', comment: '', rating: 0 }); // Estado local para la reseña

  // Función para añadir una reseña
  const addReview = (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    axios.post(`http://localhost:3000/productos/${productoId}/review`, review) // Petición POST para añadir la reseña
      .then(() => {
        setReview({ user: '', comment: '', rating: 0 }); // Reiniciar el estado de la reseña
        fetchReviews(productoId); // Actualizar las reseñas del producto
      })
      .catch(error => {
        console.error('Error al añadir la reseña:', error); // Manejo de errores en caso de fallo en la petición
      });
  };

  // Formulario para ingresar la reseña
  return (
    <form onSubmit={addReview}>
      <input 
        type="text" 
        value={review.user} 
        onChange={(e) => setReview({ ...review, user: e.target.value })} 
        placeholder="Tu nombre" 
        required 
      />
      <textarea 
        value={review.comment} 
        onChange={(e) => setReview({ ...review, comment: e.target.value })} 
        placeholder="Tu reseña" 
        required 
      />
      <input 
        type="number" 
        value={review.rating} 
        onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })} 
        placeholder="Tu calificación (1-5)" 
        min="1" 
        max="5" 
        required 
      />
      <button type="submit">Añadir Reseña</button>
    </form>
  );
};

// Componente funcional Productos para mostrar los productos
const Inicio = () => {
  const [productos, setProductos] = useState([]); // Estado local para los productos
  const [carrito, setCarrito] = useState([]); // Estado local para el carrito
  const [showConfirmation, setShowConfirmation] = useState(false); // Estado local para mostrar confirmación

  // Efecto para cargar los productos y el carrito al montar el componente
  useEffect(() => {
    axios.get('http://localhost:3000/productos') // Petición GET para obtener los productos
      .then(response => {
        setProductos(response.data.map(producto => ({
          ...producto,
          reviews: [],
          isFetchingReviews: false
        })));
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error); // Manejo de errores en caso de fallo en la petición
      });

    const carritoGuardado = localStorage.getItem('carrito'); // Obtener el carrito guardado en el almacenamiento local
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado)); // Cargar el carrito desde el almacenamiento local
    }
  }, []);

  // Efecto para guardar el carrito en el almacenamiento local al actualizar
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Guardar el carrito en el almacenamiento local
  }, [carrito]);

  // Función para obtener las reseñas de un producto
  const fetchReviews = (id) => {
    setProductos(productos.map(producto =>
      producto._id === id ? { ...producto, isFetchingReviews: true } : producto
    ));
    axios.get(`http://localhost:3000/productos/${id}/reviews`)
      .then(response => {
        setProductos(productos.map(producto =>
          producto._id === id ? { ...producto, reviews: response.data, isFetchingReviews: false } : producto
        ));
      })
      .catch(error => {
        console.error('Error al obtener las reseñas:', error); // Manejo de errores en caso de fallo en la petición
        setProductos(productos.map(producto =>
          producto._id === id ? { ...producto, isFetchingReviews: false } : producto
        ));
      });
  };

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito]; // Crear una copia del carrito
    const productoExistente = nuevoCarrito.find((item) => item._id === producto._id); // Verificar si el producto ya está en el carrito
    if (productoExistente) {
      productoExistente.cantidad++; // Incrementar la cantidad si el producto ya está en el carrito
    } else {
      nuevoCarrito.push({ ...producto, cantidad: 1 }); // Agregar el producto al carrito con cantidad 1
    }
    setCarrito(nuevoCarrito); // Actualizar el carrito
    setShowConfirmation(true); // Mostrar confirmación de agregado al carrito
    setTimeout(() => setShowConfirmation(false), 3000); // Ocultar la confirmación después de 3 segundos
  };

  // Renderizado de la interfaz de usuario
  return (
    <div className="container mx-auto p-4">
      {/* Mensaje de bienvenida con logo */}
      <div className="mb-8 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 flex items-center">
        <img src="https://png.pngtree.com/png-vector/20210917/ourlarge/pngtree-picnic-fruit-and-vegetable-basket-png-image_3936553.jpg" alt="Logo Mi Huerto" className="w-16 h-16 mr-4" />
        <div>
          <p className="font-semibold text-xl">Bienvenido a mi huerto online</p>
          <p>Compra verduras y frutas orgánicas cosechadas con los mejores cuidados.</p>
        </div>
      </div>
  
      {/* Título de la sección de productos */}
      <h2 className="text-3xl font-bold text-center mb-6">Nuestros Productos</h2>
  
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {productos.map(producto => (
          <motion.div 
            key={producto._id} 
            className="border p-4 rounded-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <h3 className="text-xl font-semibold">{producto.name}</h3>
            <p className="text-gray-700">{producto.description}</p>
            <p className="font-bold">Precio: ${producto.price}</p>
            <p>Cantidad: {producto.quantity}</p>
            <p>Disponibilidad: <span className={producto.availability ? 'text-green-500' : 'text-red-500'}>{producto.availability ? 'Disponible' : 'No disponible'}</span></p>
            {producto.image && <img src={`http://localhost:3000/${producto.image}`} alt={producto.name} className="w-full h-64 object-cover object-center mt-2" />}
            <button 
              onClick={() => fetchReviews(producto._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition duration-300 ease-in-out mt-2"
            >
              {producto.isFetchingReviews ? 'Cargando reseñas...' : 'Mostrar Reseñas'}
            </button>
        
            {producto.reviews.map(review => (
              <div key={review._id}>
                <p>{review.user}: {review.comment} - Calificación: {review.rating}</p>
              </div>
            ))}
            <ReviewForm productoId={producto._id} fetchReviews={fetchReviews} />
            <button 
              onClick={() => agregarAlCarrito(producto)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-300 ease-in-out mt-2"
            >
              Agregar al Carrito
            </button>
          </motion.div>
        ))}
      </div>
      <Link to="/carro" className="text-blue-500 hover:text-blue-600 transition duration-300 ease-in-out">Ver Carrito</Link>
      {showConfirmation && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-lg">
            <p>Producto agregado al carrito!</p>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Inicio;