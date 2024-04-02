import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MiComponente from './components/MiComponente';
import Header from './components/Header'; 
import Admin from './pages/Admin'; 
import Inicio from './pages/Inicio'; 
import Carro from './pages/Carro'; 
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import SurveyPage from './pages/SurveyPage';

// Crea un contexto para el tema de la aplicación
export const ThemeContext = createContext(null); // Exporta el ThemeContext

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Función para alternar entre el modo oscuro y claro
  const toggleTheme = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <AuthProvider>
      <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
        <Router>
          <Header /> {/* Coloca el Header dentro del Router y el ThemeContext.Provider */}
          <div className={darkMode ? 'bg-dark text-white' : 'bg-light text-black'}>
            <Routes>
              <Route path="/" element={<Inicio />} /> {/* Ruta para la página de inicio */}
              <Route path="/micomponente" element={<MiComponente />} /> {/* Ruta para MiComponente */}
              <Route path="/login" element={<Login />} /> {/* Ruta para la página de inicio de sesión */}
              <Route path="/register" element={<Register />} /> {/* Ruta para la página de registro */}
              <Route path="/surveypage" element={<SurveyPage />} /> {/* Ruta para la página de encuesta */}
              <Route element={<ProtectedRoute/>}> {/* Ruta protegida */}
                <Route path="/admin" element={<Admin />} /> {/* Ruta para la página de administrador */}
                <Route path="/carro" element={<Carro />} /> {/* Ruta para la página del carrito */}
              </Route>
            </Routes>
          </div>
        </Router>
      </ThemeContext.Provider>
    </AuthProvider>
  );
};

export default App;
