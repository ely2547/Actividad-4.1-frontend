import { useForm } from "react-hook-form"; 
import { useAuth } from "../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm(); // Inicializa el hook useForm y extrae las funciones y estado necesarios para el formulario.
  const { signup, isAuthenticated, errors: registerErrors } = useAuth(); // Utiliza el hook useAuth para obtener funciones de registro, estado de autenticación y posibles errores.
  const navigate = useNavigate(); // Obtiene la función de navegación de useNavigate.

  useEffect(() => {
    if (isAuthenticated) navigate("/"); // Efecto que redirige a la página principal si el usuario está autenticado.
  }, [isAuthenticated]); // Dependencia del efecto para ejecutarse cuando cambie el estado de autenticación.

  const onSubmit = handleSubmit((data) => {
    signup(data); // Función que se ejecuta al enviar el formulario, llamando a la función de registro con los datos del formulario.
  });

  return (
    <motion.div
      initial={{ opacity: 0 }} // Configuración de animación inicial de opacidad.
      animate={{ opacity: 1 }} // Configuración de animación de opacidad al renderizar.
      exit={{ opacity: 0 }} // Configuración de animación de salida con opacidad.
      className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500" // Clases de estilo para el contenedor principal.
    >
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <motion.div
          initial={{ x: '-100vw' }} // Configuración de animación inicial de posición en el eje X.
          animate={{ x: 0 }} // Configuración de animación de posición en el eje X al renderizar.
          transition={{ type: 'spring', stiffness: 120 }} // Configuración de transición con efecto de resorte.
          className="mb-4" // Clases de estilo para el contenedor.
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Registro de Usuario</h2> 
          {registerErrors.map((error, i) => ( // Mapeo de errores de registro para mostrar mensajes.
            <div className="bg-red-400 text-white text-sm rounded-md p-2 my-2" key={i}> 
              {error.message} 
            </div>
          ))}
          <div className="mb-4"> // Contenedor para campo de nombre de usuario.
            <input type="text" {...register("username", { required: "El nombre de usuario es obligatorio" })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Nombre de usuario" /> // Campo de entrada para nombre de usuario con validación y estilos.
            {errors.username && <p className="text-red-500 text-xs italic">{errors.username.message}</p>}
          </div>
          {/* Otros campos de entrada de email y contraseña siguen un patrón similar */}
          <motion.button
            whileHover={{ scale: 1.05 }} // Efecto de escala al pasar el cursor sobre el botón.
            whileTap={{ scale: 0.95 }} // Efecto de escala al presionar el botón.
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" // Estilos para el botón de registro.
            type="submit" // Tipo de botón para enviar el formulario.
          >
            Registrarse
          </motion.button>
          <div className="text-center mt-4"> 
            <Link to="/login" className="inline-block align-baseline font-bold text-sm text-green-500 hover:text-green-800"> // Enlace para redirigir a la página de inicio de sesión.
              ¿Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default RegisterPage 