import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Carro = () => {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter((item) => item._id !== id);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const cambiarCantidad = (id, cantidad) => {
    const nuevoCarrito = carrito.map((item) => {
      if (item._id === id) {
        return { ...item, cantidad };
      }
      return item;
    });
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.price * item.cantidad, 0);
  };

  const contactarPorWhatsApp = () => {
    let mensaje = 'Hola, me gustaría completar la compra de los siguientes productos:';
    carrito.forEach((item) => {
      mensaje += `%0A${item.name} (Cantidad: ${item.cantidad}) - Precio: $${item.price}`;
    });
    mensaje += `%0ATotal: $${calcularTotal()}`;
    
    const numeroWhatsApp = '+584164694935';
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
    window.open(urlWhatsApp, '_blank');
  };
  

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4"
      style={{ minHeight: '100vh' }} 
    >
      <h2 className="text-2xl font-bold mb-4">Tu Carrito</h2>
      {carrito.length > 0 ? (
        carrito.map((item) => (
          <motion.div key={item._id} layout className="mb-4 p-4 border rounded shadow">
            <h4 className="text-xl font-semibold">{item.name}</h4>
            <p>Cantidad: 
              <input 
                type="number" 
                value={item.cantidad} 
                onChange={(e) => cambiarCantidad(item._id, parseInt(e.target.value))}
                className="mx-2 px-2 py-1 border rounded"
              />
            </p>
            <p>Precio: ${item.price}</p>
            <button 
              onClick={() => eliminarProducto(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </motion.div>
        ))
      ) : (
        <p>Tu carrito está vacío.</p>
      )}
      <div className="flex justify-between items-center mt-4">
        <h3 className="text-lg font-semibold">Total a pagar: ${calcularTotal()}</h3>

        <button 
          onClick={contactarPorWhatsApp}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Continuar la compra por WhatsApp
        </button>
      </div>
    </motion.div>
  );
};

export default Carro;
