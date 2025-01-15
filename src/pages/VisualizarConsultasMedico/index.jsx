import React, { useEffect, useState } from 'react';
import { Container, Column, Header, List, ListItem, Button, FilterContainer } from './style';
import apiService from '../../api/api';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function VisualizarConsultas() {
    const [consultasAgendadas, setConsultasAgendadas] = useState([]);
    const [historicoConsultas, setHistoricoConsultas] = useState([]);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const navigate = useNavigate();

    const getDoctorIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            return decodedToken.nameid;
        }
        return null;
    };

    useEffect(() => {
        const fetchConsultas = async () => {
            const doctorId = getDoctorIdFromToken();
            if (!doctorId) {
                console.error("Doctor ID não encontrado no token.");
                return;
            }

            try {
                const response = await apiService.getConsultByDoctor(doctorId);
                const todasConsultas = response.data;
                const agora = moment();

                const futuras = todasConsultas.filter((consulta) => {
                    const dataConsulta = moment(consulta.dateTimeQuery, 'DD-MM-YYYY HH:mm:ss');
                    return (
                        !consulta.isCanceled &&
                        (dataConsulta.isAfter(agora) || dataConsulta.isSame(agora, 'day'))
                    );
                });

                setConsultasAgendadas(futuras);
                setHistoricoConsultas(todasConsultas);
            } catch (error) {
                console.error("Erro ao buscar consultas:", error);
            }
        };

        fetchConsultas();
    }, []);

    const getStatus = (consulta) => {
        if (consulta.isCanceled) return "Cancelada";
        const agora = moment();
        const dataConsulta = moment(consulta.dateTimeQuery, 'DD-MM-YYYY HH:mm:ss');
        return dataConsulta.isBefore(agora) ? "Concluída" : "Agendada";
    };

    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const filteredConsultas = historicoConsultas.filter((consulta) => {
        const status = getStatus(consulta);
        return filterStatus === '' || status === filterStatus;
    });

    const handleBack = () => {
        navigate('/homeMedico');
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <Container>
            <div style={{ marginBottom: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Button onClick={handleBack} style={{ backgroundColor: '#013d32' }}>
                    Voltar para Perfil
                </Button>
                <Button onClick={handleLogout} style={{ backgroundColor: '#fa5a54' }}>
                    Sair
                </Button>
            </div>
            <Column>
                <Header>Consultas Agendadas</Header>
                <List>
                    {consultasAgendadas.length > 0 ? (
                        consultasAgendadas.map((consulta) => (
                            <ListItem key={consulta.id}>
                                <p><strong>Descrição:</strong> {consulta.description}</p>
                                <p><strong>Data e Hora:</strong> {consulta.dateTimeQuery}</p>
                                <p><strong>Paciente:</strong> {consulta.patientName}</p>
                                <p><strong>Idade:</strong> {consulta.patientAge}</p>
                                <p><strong>Telefone:</strong> {consulta.patientTelephone}</p>
                            </ListItem>
                        ))
                    ) : (
                        <p>Não há Nenhuma Consulta Agendada para você, doutor.</p>
                    )}
                </List>
            </Column>
            <Column>
                <Header>Histórico de Consultas</Header>
                <FilterContainer>
                    <h5>Filtrar por status:</h5>
                    <select value={filterStatus} onChange={handleFilterChange}>
                        <option value="">Todos</option>
                        <option value="Concluída">Concluída</option>
                        <option value="Cancelada">Cancelada</option>
                        <option value="Agendada">Agendada</option>
                    </select>
                </FilterContainer>
                <List>
                    {filteredConsultas.length > 0 ? (
                        filteredConsultas.map((consulta) => (
                            <ListItem key={consulta.id}>
                                <p><strong>Descrição:</strong> {consulta.description}</p>
                                <p><strong>Data e Hora:</strong> {consulta.dateTimeQuery}</p>
                                <p><strong>Paciente:</strong> {consulta.patientName}</p>
                                <p><strong>Idade:</strong> {consulta.patientAge}</p>
                                <p><strong>Telefone:</strong> {consulta.patientTelephone}</p>
                                <p>
                                    <strong>Status:</strong>{' '}
                                    <strong
                                        style={{
                                            color:
                                                getStatus(consulta) === 'Concluída'
                                                    ? '#013229'
                                                    : getStatus(consulta) === 'Agendada'
                                                        ? '#d1a00d'
                                                        : getStatus(consulta) === 'Cancelada'
                                                            ? '#fa5a54'
                                                            : '#000',
                                        }}
                                    >
                                        {getStatus(consulta)}
                                    </strong>
                                </p>
                            </ListItem>
                        ))
                    ) : (
                        <p>Nenhuma consulta encontrada para o status selecionado.</p>
                    )}
                </List>
            </Column>
        </Container>
    );
}
