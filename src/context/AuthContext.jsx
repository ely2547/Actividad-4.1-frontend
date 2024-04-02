import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verityTokenRequet } from "../api/api";
import Cookies from "js-cookie";

// Crear un contexto de autenticación
export const AuthContext = createContext()

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider")
    }
    return context
}

// Componente proveedor de autenticación
export const AuthProvider = ({ children }) => {

    // Estados para el usuario, autenticación, errores y carga
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)

    // Función para registrarse
    const signup = async (user) => {
        try {
            const res = await registerRequest(user)
            console.log(res.data)
            setUser(res.data)
            setIsAuthenticated(true)
        } catch (error) {
            console.log(error.response)
            setErrors(error.response.data)
        }
    };

    // Función para iniciar sesión
    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res)
            setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data])
        }
    }

    // Función para cerrar sesión
    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false)
        setUser(null)
    }

    // Eliminar los mensajes de error después de 5 segundos
    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors])

    // Verificar si el usuario está logueado al cargar la página
    useEffect(() => {
        async function checkLogin() {
            const cookies = Cookies.get();
            if (!cookies.token) {
                setIsAuthenticated(false)
                setLoading(false)
                setUser(null)
                return;
            }
            try {
                const res = await verityTokenRequet(cookies.token)
                console.log(res)
                if (!res.data) {
                    setIsAuthenticated(false)
                    setLoading(false)
                    return
                }
                setIsAuthenticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setIsAuthenticated(false)
                setUser(null)
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    // Proveer el contexto con las funciones y estados necesarios
    return (
        <AuthContext.Provider value={
            {
                signup,
                signin,
                logout,
                loading,
                user,
                isAuthenticated,
                errors,
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}
