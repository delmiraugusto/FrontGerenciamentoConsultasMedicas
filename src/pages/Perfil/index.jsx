import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Row, Header, Container, FormGroup, Input, Button, BlockedInput, Select, Option, ButtonContainer } from './style';
import apiService from '../../api/api';

export default function Perfil() {
    const [user, setUser] = useState({});
    const [isActive, setIsActive] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const decodedToken = token ? jwt_decode(token) : null;

    const userId = decodedToken?.nameid;
    const userRole = decodedToken?.role;

    const fetchUserData = async () => {
        if (userRole === 'Medico') {
            const response = await apiService.getDoctorById(userId);
            setUser(response.data);
            setIsActive(response.data.isActive);
        } else if (userRole === 'Paciente') {
            const response = await apiService.getPatientById(userId);
            setUser(response.data);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [userRole, userId]);

    const handleSave = async () => {
        const updatedData = {
            ...user,
            isActive,
        };

        if (userRole === 'Medico') {
            await apiService.updateDoctor(user.id, updatedData);
        } else if (userRole === 'Paciente') {
            await apiService.updatePatient(user.id, updatedData);
        }

        setEditMode(false);
        alert('Dados salvos com sucesso!');
    };

    const handleDisable = async () => {
        if (userRole === 'Medico') {
            try {
                await apiService.deleteDoctor(user.id); // Chama a função de exclusão
                alert('Perfil desativado com sucesso!');
                window.location.reload();
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message); // Mostra a mensagem de erro recebida da API
                } else {
                    alert('Erro ao desativar o perfil do médico!');
                }
            }
        }
    };

    const handleDeletePatient = async () => {
        if (userRole === 'Paciente') {
            try {
                await apiService.deletePatient(user.id); // Chama a função de exclusão
                localStorage.removeItem('token');
                navigate('/');
                alert('Perfil deletado com sucesso!');
            } catch (error) {
                if (error.response && error.response.data && error.response.data.message) {
                    alert(error.response.data.message); // Mostra a mensagem de erro recebida da API
                } else {
                    alert('Erro ao excluir o perfil do paciente!');
                }
            }
        }
    };

    return (
        <Container>
            <Header>{userRole === 'Medico' ? 'Dados Cadastrais do Doutor' : 'Dados Cadastrais do Paciente'}</Header>

            <Row>
                <FormGroup>
                    <label>Nome</label>
                    <Input
                        type="text"
                        value={user.name || ''}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        disabled={!editMode}  // Agora o nome só é editável quando editMode for verdadeiro
                    />
                </FormGroup>
                <FormGroup>
                    <label>Email</label>
                    <Input
                        type="email"
                        value={user.email || ''}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        disabled
                    />
                </FormGroup>
                <FormGroup>
                    <label>Telefone</label>
                    <Input
                        type="text"
                        value={user.telephone || ''}
                        onChange={(e) => setUser({ ...user, telephone: e.target.value })}
                        disabled={!editMode}
                    />
                </FormGroup>
                {userRole === 'Medico' && (
                    <FormGroup>
                        <label>CRM</label>
                        <BlockedInput type="text" value={user.crm} disabled />
                    </FormGroup>
                )}

                {userRole === 'Paciente' && (
                    <FormGroup>
                        <label>CPF</label>
                        <BlockedInput type="text" value={user.cpf} disabled />
                    </FormGroup>
                )}

                {userRole === 'Medico' && (
                    <FormGroup>
                        <label>Status</label>
                        <Select
                            value={isActive}
                            onChange={(e) => setIsActive(e.target.value === 'true')}
                            disabled={!editMode}
                        >
                            <Option value={true}>Ativo</Option>
                            <Option value={false}>Inativo</Option>
                        </Select>
                    </FormGroup>
                )}
            </Row>

            <ButtonContainer>
                <Button onClick={() => navigate(-1)} className="back">
                    Voltar
                </Button>
                {editMode ? (
                    <Button style={{ backgroundColor: "#013d32", color: "white" }} onClick={handleSave} className="save">
                        Salvar
                    </Button>
                ) : (
                    <Button onClick={() => setEditMode(true)} className="edit">
                        Editar
                    </Button>
                )}

                {userRole === 'Medico' && (
                    <Button onClick={handleDisable} className="delete" style={{ marginLeft: 'auto' }}>
                        Desativar Perfil
                    </Button>
                )}

                {userRole === 'Paciente' && (
                    <Button onClick={handleDeletePatient} style={{ marginLeft: 'auto' }} className="delete">
                        Deletar Perfil
                    </Button>
                )}
            </ButtonContainer>
        </Container>
    );
}
