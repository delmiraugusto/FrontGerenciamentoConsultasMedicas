import React from 'react';
import { Container, HeaderWrapper, NavButton } from './style';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function MedicoHome() {
    const navigate = useNavigate();

    const getMedicoName = () => {
        const token = localStorage.getItem('token');
        console.log('token:', token);

        if (token) {
            const decodedToken = jwt_decode(token);
            console.log('Decoded Token:', decodedToken);
            return decodedToken.unique_name || 'Médico(a)';
        }
        return 'Médico(a)';
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <Container>
            <HeaderWrapper>
                <h1>Bem-vindo(a), Dr(a) {getMedicoName()}</h1>
                <div>
                    <NavButton onClick={() => handleNavigate('/visualizar-consulta')}>
                        Visualizar Consultas
                    </NavButton>
                    <NavButton onClick={() => handleNavigate('/perfil')}>
                        Ver Perfil
                    </NavButton>
                </div>
            </HeaderWrapper>
        </Container>
    );
}
