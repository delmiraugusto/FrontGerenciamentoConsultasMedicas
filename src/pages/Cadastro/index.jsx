import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {
    Container,
    FormWrapper,
    Title,
    InputGroup,
    Label,
    Input,
    CustomButton,
    BackButton,
    ErrorText,
} from './style';
import apiService from '../../api/api';

export default function AgendamentoConsulta() {
    const [formData, setFormData] = useState({
        description: '',
        dateTimeQuery: '',
        id_doctor: '',
    });
    const [doctors, setDoctors] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // Obter o ID do paciente do token
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id_patient = decodedToken?.nameid;

    // Carregar a lista de médicos
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await apiService.getAllDoctors();
                setDoctors(response.data);
            } catch (error) {
                console.error('Erro ao carregar médicos:', error);
                alert('Erro ao carregar a lista de médicos. Tente novamente mais tarde.');
            }
        };

        fetchDoctors();
    }, []);

    // Atualizar estado com valores do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submeter formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validação dos campos
        const newErrors = {};
        if (!formData.description) newErrors.description = 'Descrição é obrigatória.';
        if (!formData.dateTimeQuery) newErrors.dateTimeQuery = 'Data e hora são obrigatórias.';
        if (!formData.id_doctor) newErrors.id_doctor = 'Escolha um médico.';
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        // Converter a data e hora para o formato ISO
        try {
            const [date, time] = formData.dateTimeQuery.split(' ');
            const [day, month, year] = date.split('-');
            const formattedDateTime = `${year}-${month}-${day}T${time}:00`;

            const appointmentData = {
                description: formData.description,
                dateTimeQuery: formattedDateTime,
                id_patient,
                id_doctor: formData.id_doctor,
            };

            // Enviar dados para a API
            await apiService.addConsult(appointmentData);
            alert('Consulta agendada com sucesso!');
            navigate('/');
        } catch (error) {
            console.error('Erro ao agendar consulta:', error);
            alert('Erro ao agendar consulta. Tente novamente.');
        }
    };

    return (
        <Container>
            <FormWrapper onSubmit={handleSubmit}>
                <Title>Agendar Consulta</Title>

                <InputGroup>
                    <Label>Descrição *</Label>
                    <Input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Informe a descrição da consulta"
                    />
                    {errors.description && <ErrorText>{errors.description}</ErrorText>}
                </InputGroup>

                <InputGroup>
                    <Label>Data e Hora (dd-MM-yyyy HH:mm) *</Label>
                    <Input
                        name="dateTimeQuery"
                        value={formData.dateTimeQuery}
                        onChange={handleChange}
                        placeholder="Exemplo: 15-01-2025 14:30"
                    />
                    {errors.dateTimeQuery && <ErrorText>{errors.dateTimeQuery}</ErrorText>}
                </InputGroup>

                <InputGroup>
                    <Label>Médico *</Label>
                    <select
                        name="id_doctor"
                        value={formData.id_doctor}
                        onChange={handleChange}
                    >
                        <option value="">Selecione um médico</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                {doctor.name}
                            </option>
                        ))}
                    </select>
                    {errors.id_doctor && <ErrorText>{errors.id_doctor}</ErrorText>}
                </InputGroup>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <BackButton onClick={() => navigate('/')}>Voltar</BackButton>
                    <CustomButton type="submit">Agendar</CustomButton>
                </div>
            </FormWrapper>
        </Container>
    );
}
