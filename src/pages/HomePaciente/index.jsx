import React from 'react';
import { Container, HeaderWrapper, NavButton } from './style';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function MedicoHome() {
    const navigate = useNavigate();

    const getMedicoName = () => {
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwt_decode(token);
            console.log('Decoded Token:', decodedToken);
            return decodedToken.unique_name;
        }
        return 'Médico(a)';
    };

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
                <h1>Bem-vindo(a), {getMedicoName()}</h1>
                <div>
                    <NavButton onClick={() => handleNavigate('/visualizar-consulta')}>Visualizar Consultas</NavButton>
                    <NavButton onClick={() => handleNavigate('/')}>Per</NavButton>
                    <NavButton onClick={() => handleNavigate('/perfil')}>Ver Perfil</NavButton>
                </div>
                <NavButton className="logout" onClick={handleLogout}>Sair</NavButton>
            </HeaderWrapper>
        </Container>
    );
}
