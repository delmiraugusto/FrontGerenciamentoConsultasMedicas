import React, { useEffect, useState } from 'react';
import { Container, Column, Header, List, ListItem, Button, FilterContainer, Modal, Input, Overlay } from './style';
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

    const handleEditClick = (consulta) => {
        setSelectedConsulta({ ...consulta });
        setModalOpen(true);
    };

    const handleSave = async () => {
        const { id, description, dateTimeQuery } = selectedConsulta;
        const inputMoment = moment(dateTimeQuery, 'DD-MM-YYYY HH:mm:ss', true);
        if (!inputMoment.isValid()) {
            alert('A data informada não é válida. Por favor, insira uma data no formato correto (DD-MM-YYYY HH:mm:ss).');
            return;
        }
        if (inputMoment.isBefore(moment(), 'minute')) {
            alert('Não é permitido editar para uma data no passado.');
            return;
        }
        const payload = {
            id,
            ...(description && { description }),
            ...(dateTimeQuery && {
                dateTimeQuery: inputMoment.format('YYYY-MM-DDTHH:mm'),
            }),
        };
        try {
            await apiService.updateConsult(id, payload);
            alert('Consulta editada com sucesso!');
            setModalOpen(false);
            setSelectedConsulta(null);
            setConsultasAgendadas((prev) => {
                const agora = moment();
                const novaData = moment(payload.dateTimeQuery);
                return prev.map((consulta) =>
                    consulta.id === id
                        ? { ...consulta, ...payload, dateTimeQuery: novaData.format('DD-MM-YYYY HH:mm:ss') }
                        : consulta
                ).filter(
                    (consulta) =>
                        !consulta.isCanceled &&
                        moment(consulta.dateTimeQuery, 'DD-MM-YYYY HH:mm:ss').isAfter(agora) ||
                        moment(consulta.dateTimeQuery, 'DD-MM-YYYY HH:mm:ss').isSame(agora, 'day')
                );
            });
            setHistoricoConsultas((prev) =>
                prev.map((consulta) =>
                    consulta.id === id
                        ? { ...consulta, ...payload, dateTimeQuery: moment(payload.dateTimeQuery).format('DD-MM-YYYY HH:mm:ss') }
                        : consulta
                )
            );
        } catch (error) {
            console.error('Erro ao editar consulta:', error);
            alert('Ocorreu um erro ao editar a consulta. Tente novamente.');
        }
    };
    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedConsulta(null);
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
                                <Button style={{ backgroundColor: '#ffca2c', color: 'black' }} onClick={() => handleEditClick(consulta)}>Editar Consulta</Button>
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
            {modalOpen && (
                <>
                    <Overlay />
                    <Modal style={{ width: '50%', padding: '20px', margin: '0 auto' }}>
                        <h2 style={{ textAlign: 'center' }}>Editar Consulta</h2>
                        <label style={{ display: 'block', margin: '10px 0' }}>
                            Descrição:
                            <Input
                                value={selectedConsulta.description}
                                onChange={(e) => setSelectedConsulta({ ...selectedConsulta, description: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }}
                            />
                        </label>
                        <label style={{ display: 'block', margin: '10px 0' }}>
                            Data e Hora:
                            <Input
                                type="text"
                                value={selectedConsulta.dateTimeQuery || ''}
                                placeholder="DD-MM-YYYY HH:mm:ss"
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    setSelectedConsulta({
                                        ...selectedConsulta,
                                        dateTimeQuery: inputValue,
                                    });
                                }}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }}
                            />
                        </label>
                        <label style={{ display: 'block', margin: '10px 0' }}>
                            Paciente:
                            <Input
                                value={selectedConsulta.patientName}
                                disabled
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }}
                            />
                        </label>
                        <label style={{ display: 'block', margin: '10px 0' }}>
                            Idade:
                            <Input
                                value={selectedConsulta.patientAge}
                                disabled
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }}
                            />
                        </label>
                        <label style={{ display: 'block', margin: '10px 0' }}>
                            Telefone:
                            <Input
                                value={selectedConsulta.patientTelephone}
                                disabled
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }}
                            />
                        </label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <Button onClick={handleCloseModal} style={{ backgroundColor: '#3D3D3D', width: '10rem' }}>
                                Voltar
                            </Button>
                            <Button onClick={handleSave} style={{ backgroundColor: '#013d32', width: '10rem' }}>
                                Salvar
                            </Button>
                        </div>
                    </Modal>
                </>
            )}
        </Container>
    );
}
