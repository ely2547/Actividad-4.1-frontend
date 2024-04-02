import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import { FaShoppingCart } from 'react-icons/fa';
import { useAuth } from "../context/AuthContext";

const Header = () => {
  // Obtenemos el estado de darkMode y la función toggleTheme del contexto ThemeContext
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  // Obtenemos el estado de isAuthenticated y la función logout del contexto de autenticación
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-cyan-500 to-blue-300 shadow-xl">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          {/* Enlaces de navegación */}
          <Link to="/" className="text-white font-semibold text-lg tracking-wide hover:text-yellow-300 transition duration-300">Inicio</Link>
          <Link to="/admin" className="text-white font-semibold text-lg tracking-wide hover:text-yellow-300 transition duration-300">Admin</Link>
          <Link to="/micomponente" className="text-white font-semibold text-lg tracking-wide hover:text-yellow-300 transition duration-300">Recetario</Link>
          <Link to="/surveypage" className="text-white font-semibold text-lg tracking-wide hover:text-yellow-300 transition duration-300">Encuestas del día</Link>
          {/* Condicionales para mostrar u ocultar enlaces basados en la autenticación */}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white font-semibold text-lg tracking-wide hover:text-yellow-300 transition duration-300">Login</Link>
              <Link to="/register" className="text-white font-semibold text-lg tracking-wide hover:text-yellow-300 transition duration-300">Registro</Link>
            </>
          )}
          {isAuthenticated && (
            <button onClick={logout} className="text-white font-semibold text-lg tracking-wide hover:text-yellow-300 transition duration-300">
              Logout
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {/* Enlace al carrito de compras */}
          <Link to="/carro" className="text-white text-2xl hover:text-yellow-300 transition duration-300">
            <FaShoppingCart />
          </Link>
          {/* Botón para cambiar entre modos claro y oscuro */}
          <button onClick={toggleTheme} className={`p-2 rounded-full ${darkMode ? 'bg-yellow-600' : 'bg-indigo-600'} text-white flex items-center justify-center transition duration-300`}>
            {darkMode ? <span>🌞 Modo Claro</span> : <span>🌜 Modo Oscuro</span>}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
