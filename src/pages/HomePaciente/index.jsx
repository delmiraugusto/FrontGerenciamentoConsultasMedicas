import React, { useEffect, useState } from 'react';
import { Container, HeaderWrapper, NavButton } from './style';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import apiService from '../../api/api';

export default function PacienteHome() {
    const navigate = useNavigate();
    const [pacientName, setPacientName] = useState('');

    useEffect(() => {
        const fetchPacientName = async () => {
            try {
                const token = localStorage.getItem('token');


                if (!token) {
                    console.error('Token não encontrado');
                    setPacientName('Paciente');
                    return;
                }

                const decodedToken = jwt_decode(token);
                const userId = decodedToken?.nameid;

                if (userId) {
                    const response = await apiService.getPatientById(userId);
                    console.log(response);
                    const name = response.data.name;

                    setPacientName(name);
                } else {
                    setPacientName('Medico');
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do paciente:', error);
                setPacientName('Paciente');
            }
        };

        fetchPacientName();
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
                <h1>Bem-vindo(a), {pacientName}</h1>
                <div>
                    <NavButton onClick={() => handleNavigate('/visualizar-consulta-paciente')}>Visualizar Consultas</NavButton>
                    <NavButton onClick={() => handleNavigate('/agendamento-consulta')}>Agendar Consulta</NavButton>
                    <NavButton onClick={() => handleNavigate('/perfil')}>Ver Perfil</NavButton>
                </div>
                <NavButton className="logout" onClick={handleLogout}>Sair</NavButton>
            </HeaderWrapper>
        </Container>
    );
}
