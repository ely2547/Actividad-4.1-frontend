import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LoginPage() {
  // Utilizando useForm de react-hook-form para manejar el formulario
  const { register, handleSubmit, formState: { errors } } = useForm();
  // Accediendo a la autenticación y posibles errores de inicio de sesión a través de useAuth
  const { signin, isAuthenticated, errors: signinErrors } = useAuth();
  // Utilizando useNavigate para la navegación en la aplicación
  const navigate = useNavigate();

  // Efecto que redirige a la página principal si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  // Función que se ejecuta al enviar el formulario
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600"
    >
      <form onSubmit={onSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <motion.div
          initial={{ y: -250 }}
          animate={{ y: -10 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          className="mb-4"
        >
          <h2 className="text-3xl font-bold mb-2 text-center text-gray-800">Acceso a tu cuenta</h2>
          {/* Mapeo de errores de inicio de sesión para mostrar mensajes */}
          {signinErrors.map((error, i) => (
            <div className="bg-red-400 text-white text-sm rounded-md p-2 my-2" key={i}>
              {error.message}
            </div>
          ))}
          <div className="mb-4">
            {/* Campo de entrada para el correo electrónico con validación de requerido */}
            <input type="email" {...register("email", { required: "El correo electrónico es obligatorio" })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Correo electrónico" />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email.message}</p>}
          </div>
          <div className="mb-6">
            {/* Campo de entrada para la contraseña con validación de requerido */}
            <input type="password" {...register("password", { required: "La contraseña es obligatoria" })} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" placeholder="Contraseña" />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password.message}</p>}
          </div>
          {/* Botón de inicio de sesión con efectos de animación */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar Sesión
          </motion.button>
          <div className="text-center mt-4">
            {/* Enlace para redirigir a la página de registro */}
            <Link to="/register" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Crear una cuenta nueva
            </Link>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

export default LoginPage;
