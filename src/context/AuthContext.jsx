import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import jwt_decode from 'jwt-decode';
import apiService from "../api/api";
export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const isAuthenticated = () => {
        const token = localStorage.getItem('token');
        const decodedToken = jwt_decode(token);

        if (decodedToken != null) {
            const role = decodedToken?.role;

            if (role === "Medico") {
                return true;
            }
            else {
                return false;
            }
        } else if (Object.keys(user).length > 0) {
            return true;
        }
        return false;
    };

    const login = async (email, password) => {

        try {
            const response = await apiService.login({
                email,
                password
            });

            const token = response.data;
            if (token) {
                localStorage.setItem('token', token);

                const decodedToken = jwt_decode(token);
                const userRole = decodedToken?.role;
                alert("Login Realizado com Sucesso");

                setTimeout(() => {
                    setUser(userRole)
                    if (userRole === "Medico") {
                        navigate('/homeMedico')
                    } else if (userRole === "Paciente") {
                        navigate("/homePaciente")
                    } else {
                        alert("Role desconhecida");
                    }
                }, 1000)
            } else {
                alert("Token não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao fazer login", error);
            alert("E-mail ou senha inválidos.");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                login,
                isAuthenticated,
            }}
        >
            {children}

        </AuthContext.Provider>
    );
}