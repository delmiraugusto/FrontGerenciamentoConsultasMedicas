import React, { useEffect, useState } from 'react';
import { Container, Column, Header, List, ListItem, Button, Modal, Input } from './style';
import apiService from '../../api/api';
import jwt_decode from 'jwt-decode';
import moment from 'moment';

export default function VisualizarConsultas() {
    const [consultasAgendadas, setConsultasAgendadas] = useState([]);
    const [historicoConsultas, setHistoricoConsultas] = useState([]);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

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
                console.log(`Buscando consultas para o doctorId: ${doctorId}`);
                const response = await apiService.getConsultByDoctor(doctorId);
                console.log('Resposta da API:', response.data);

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

    const handleEditClick = (consulta) => {
        setSelectedConsulta({ ...consulta });
        setModalOpen(true);
    };

    const handleSave = async () => {
        const { id, description, dateTimeQuery } = selectedConsulta;

        const payload = {
            id,
            ...(description && { description }),
            ...(dateTimeQuery && {
                dateTimeQuery: moment(dateTimeQuery).format('YYYY-MM-DDTHH:mm:ss'),
            }),
        };

        try {
            await apiService.updateConsult(id, payload);

            alert("Consulta editada com sucesso!");
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
            console.error("Erro ao editar consulta:", error);
            alert("Ocorreu um erro ao editar a consulta. Tente novamente.");
        }
    };


    const handleCloseModal = () => {
        setModalOpen(false);
        setSelectedConsulta(null);
    };

    return (
        <Container>
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
                                <Button onClick={() => handleEditClick(consulta)}>Editar Consulta</Button>
                            </ListItem>
                        ))
                    ) : (
                        <p>Não há Nenhuma Consulta Agendada para você, doutor.</p>
                    )}
                </List>
            </Column>

            <Column>
                <Header>Histórico de Consultas</Header>
                <List>
                    {historicoConsultas.length > 0 ? (
                        historicoConsultas.map((consulta) => (
                            <ListItem key={consulta.id}>
                                <p><strong>Descrição:</strong> {consulta.description}</p>
                                <p><strong>Data e Hora:</strong> {consulta.dateTimeQuery}</p>
                                <p><strong>Paciente:</strong> {consulta.patientName}</p>
                                <p><strong>Idade:</strong> {consulta.patientAge}</p>
                                <p><strong>Telefone:</strong> {consulta.patientTelephone}</p>
                                <p><strong>Status:</strong> {getStatus(consulta)}</p>
                            </ListItem>
                        ))
                    ) : (
                        <p>Histórico vazio, nenhuma consulta chegou a ser agendada.</p>
                    )}
                </List>
            </Column>

            {modalOpen && (
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
                            type="datetime-local"
                            value={selectedConsulta.dateTimeQuery}
                            min={moment().format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => setSelectedConsulta({ ...selectedConsulta, dateTimeQuery: e.target.value })}
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
                        <Button onClick={handleCloseModal} style={{ backgroundColor: 'gray', width: '10rem' }}>
                            Voltar
                        </Button>
                        <Button onClick={handleSave} style={{ backgroundColor: '#ffca2c', color: 'black', width: '10rem' }}>
                            Editar
                        </Button>
                    </div>
                </Modal>

            )}
        </Container>
    );
}
