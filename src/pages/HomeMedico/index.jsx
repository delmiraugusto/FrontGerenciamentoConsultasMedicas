import React, { useEffect, useState } from 'react';
import { Container, HeaderWrapper, NavButton } from './style';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import apiService from '../../api/api';

export default function MedicoHome() {
    const navigate = useNavigate();

    const [medicoName, setMedicoName] = useState('');

    useEffect(() => {
        const fetchMedicoName = async () => {
            try {
                const token = localStorage.getItem('token');
                const decodedToken = jwt_decode(token);
                const userId = decodedToken?.nameid;

                if (userId) {
                    const response = await apiService.getDoctorById(userId);
                    const name = response.data.name;

                    setMedicoName(name);
                } else {
                    setMedicoName('Medico');
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do médico:', error);
                setMedicoName('Medico');
            }
        };

        fetchMedicoName();
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <Container>
            <HeaderWrapper>
                <h1>Bem-vindo(a), Dr(a) {medicoName}</h1>
                <div>
                    <NavButton onClick={() => handleNavigate('/visualizar-consulta')}>
                        Visualizar Consultas
                    </NavButton>
                    <NavButton onClick={() => handleNavigate('/perfil')}>
                        Ver Perfil
                    </NavButton>
                    <NavButton onClick={handleLogout}>
                        Sair
                    </NavButton>
                </div>
            </HeaderWrapper>
        </Container>
    );
}
