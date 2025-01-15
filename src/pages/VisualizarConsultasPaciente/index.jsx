import React, { useEffect, useState } from 'react';
import {
    Container, Column, Header, List, ListItem, Button, Modal, Input, Overlay, EditButton, ButtonModal, FilterContainer
} from './style';
import apiService from '../../api/api';
import jwt_decode from 'jwt-decode';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function VisualizarConsultasPaciente() {
    const [consultasAgendadas, setConsultasAgendadas] = useState([]);
    const [historicoConsultas, setHistoricoConsultas] = useState([]);
    const [selectedConsulta, setSelectedConsulta] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('');
    const navigate = useNavigate();

    const getPatientIdFromToken = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwt_decode(token);
            return decodedToken.nameid;
        }
        return null;
    };

    useEffect(() => {
        const fetchConsultas = async () => {
            const patientId = getPatientIdFromToken();
            if (!patientId) {
                console.error('Paciente ID não encontrado no token.');
                return;
            }

            try {
                const response = await apiService.getConsultByPatient(patientId);
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
                console.error('Erro ao buscar consultas:', error);
            }
        };

        fetchConsultas();
    }, []);

    const getStatus = (consulta) => {
        if (consulta.isCanceled) return 'Cancelada';
        const agora = moment();
        const dataConsulta = moment(consulta.dateTimeQuery, 'DD-MM-YYYY HH:mm:ss');
        return dataConsulta.isBefore(agora) ? 'Concluída' : 'Agendada';
    };

    const handleEditClick = (consulta) => {
        setSelectedConsulta({ ...consulta });
        setModalOpen(true);
        console.log(modalOpen)
    };

    const handleSave = async () => {
        const { id, description } = selectedConsulta;


        const payload = {
            id,
            ...(description && { description })
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
                        ? { ...consulta, ...payload }
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

    const handleCancel = async () => {
        if (!selectedConsulta) return;
        const confirmCancel = window.confirm('Tem certeza que deseja cancelar esta consulta?');
        if (!confirmCancel) return;

        try {
            await apiService.deleteConsult(selectedConsulta.id);

            alert('Consulta cancelada com sucesso!');
            setModalOpen(false);
            setSelectedConsulta(null);

            setConsultasAgendadas((prev) =>
                prev.filter((consulta) => consulta.id !== selectedConsulta.id)
            );

            setHistoricoConsultas((prev) =>
                prev.map((consulta) =>
                    consulta.id === selectedConsulta.id
                        ? { ...consulta, isCanceled: true }
                        : consulta
                )
            );
        } catch (error) {
            console.error('Erro ao cancelar consulta:', error);
            alert('Ocorreu um erro ao cancelar a consulta. Tente novamente.');
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


    const handleFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    const handleBack = () => {
        navigate('/homePaciente');
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <Container>
            <div style={{ marginBottom: '20px', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <Button onClick={handleBack} style={{ backgroundColor: '#013d32', color: 'white' }}>
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
                                <p><strong>Médico(a):</strong> {consulta.doctorName}</p>
                                <p><strong>Telefone Médico:</strong> {consulta.doctorTelephone}</p>
                                <p><strong>Especialidade:</strong> {consulta.doctorSpecialty}</p>
                                <p><strong>Status:</strong> <span style={{ color: getStatus(consulta) === 'Cancelada' ? '#fa5a54' : getStatus(consulta) === 'Concluída' ? '#013229' : '#d1a00d' }}>{getStatus(consulta)}</span></p>
                                <EditButton
                                    disabled={consulta.isCanceled}
                                    onClick={() => handleEditClick(consulta)}
                                >
                                    Editar Consulta
                                </EditButton>
                            </ListItem>
                        ))
                    ) : (
                        <p>Você ainda não agendou nenhuma consulta.</p>
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
                    {historicoConsultas.length > 0 ? (
                        filteredConsultas.map((consulta) => (
                            <ListItem key={consulta.id}>
                                <p><strong>Descrição:</strong> {consulta.description}</p>
                                <p><strong>Data e Hora:</strong> {consulta.dateTimeQuery}</p>
                                <p><strong>Médico(a):</strong> {consulta.doctorName}</p>
                                <p><strong>Telefone Médico:</strong> {consulta.doctorTelephone}</p>
                                <p><strong>Especialidade:</strong> {consulta.doctorSpecialty}</p>
                                <p><strong>Status:</strong> <span style={{ color: getStatus(consulta) === 'Cancelada' ? 'red' : getStatus(consulta) === 'Concluída' ? 'green' : 'orange' }}>{getStatus(consulta)}</span></p>
                            </ListItem>
                        ))
                    ) : (
                        <p>Não há nada para mostrar, não teve nenhuma consulta.</p>
                    )}
                </List>
            </Column>
            {modalOpen && (
                <>
                    <Overlay />
                    <Modal style={{ width: '50%', padding: '20px', margin: '0 auto' }} isOpen={modalOpen}>
                        <h2 style={{ textAlign: 'center' }}>Editar Consulta</h2>
                        <label style={{ display: 'block', margin: '10px 0' }}>
                            Descrição:
                            <Input
                                type="text"
                                value={selectedConsulta?.description || ''}
                                onChange={(e) => setSelectedConsulta({ ...selectedConsulta, description: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }}
                            />
                        </label>
                        <label style={{ display: 'block', margin: '10px 0' }}>Data e Hora
                            <Input value={selectedConsulta.dateTimeQuery} disabled
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }} />
                        </label>
                        <label style={{ display: 'block', margin: '10px 0' }}>Médico(a)
                            <Input type="text" value={selectedConsulta.doctorName} disabled
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }} />
                        </label>
                        <label style={{ display: 'block', margin: '10px 0' }}>Telefone Médico
                            <Input type="text" value={selectedConsulta.doctorTelephone} disabled
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }} />
                        </label>
                        <label style={{ display: 'block', margin: '10px 0' }}>Especialidade
                            <Input type="text" value={selectedConsulta.doctorSpecialty} disabled
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    marginTop: '5px',
                                    fontSize: '16px',
                                }} />
                        </label>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                            <ButtonModal onClick={handleCloseModal} style={{ backgroundColor: '#3D3D3D', width: '10rem' }}>
                                Voltar
                            </ButtonModal>
                            <ButtonModal onClick={handleSave} style={{ backgroundColor: '#013d32', width: '10rem' }}>Salvar</ButtonModal>
                            <ButtonModal onClick={handleCancel} style={{ backgroundColor: '#fa5a54', width: '10rem' }}>Cancelar Consulta</ButtonModal>
                        </div>
                    </Modal>
                </>
            )}
        </Container >
    );
}
