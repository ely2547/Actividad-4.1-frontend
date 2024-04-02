import { Navigate, Outlet } from "react-router-dom" // Importamos Navigate y Outlet de react-router-dom
import { useAuth } from "./AuthContext" // Importamos useAuth desde el archivo AuthContext

function ProtectedRoute(params) {
    const { loading, isAuthenticated } = useAuth(); // Extraemos loading e isAuthenticated del hook useAuth

    if (loading) return <h1>Cargando</h1> // Si loading es true, mostramos un mensaje de carga

    if (!loading && !isAuthenticated) return <Navigate to="/login" replace/> // Si no estamos cargando y el usuario no está autenticado, redirigimos a la página de login

    return <Outlet/> // Si el usuario está autenticado, mostramos el contenido protegido
}

export default ProtectedRoute // Exportamos el componente ProtectedRoute
