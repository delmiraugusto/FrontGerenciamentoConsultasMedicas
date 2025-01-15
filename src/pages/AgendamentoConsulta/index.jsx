import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Container, FormWrapper, Title, InputGroup, Label, Input, CustomButton, BackButton, ErrorText } from './style';
import apiService from '../../api/api';

export default function AgendamentoConsulta() {
    const [doctors, setDoctors] = useState([]);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const id_patient = decodedToken?.nameid;

    const [formData, setFormData] = useState({
        description: '',
        dateTimeQuery: '',
        id_doctor: '',
    });

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await apiService.getAllDoctors('doctor');
                setDoctors(response.data);
            } catch (error) {
                console.error('Erro ao carregar médicos:', error);
            }
        };

        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const isValidDateTime = (dateTime) => {
        const currentDateTime = new Date();
        const selectedDateTime = new Date(dateTime);
        return selectedDateTime > currentDateTime;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.description) newErrors.description = 'Descrição é obrigatória.';
        if (!formData.dateTimeQuery) newErrors.dateTimeQuery = 'Data e hora são obrigatórias.';
        if (!formData.id_doctor) newErrors.id_doctor = 'Escolha um médico.';
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;

        if (!isValidDateTime(formData.dateTimeQuery)) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                dateTimeQuery: 'A data e hora não podem ser no passado.',
            }));
            return;
        }

        const [date, time] = formData.dateTimeQuery.split('T');
        const formattedDateTime = `${date}T${time}:00`;

        const appointmentData = {
            description: formData.description,
            dateTimeQuery: formattedDateTime,
            id_patient: parseInt(id_patient, 10),
            id_doctor: parseInt(formData.id_doctor, 10),
        };

        try {
            await apiService.addConsult(appointmentData);
            alert('Consulta agendada com sucesso!');
            navigate('/homePaciente');
        } catch (error) {
            console.error('Erro ao agendar consulta:', error);
            alert('Erro ao agendar consulta. Tente novamente.');
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Agendar Consulta</Title>

                <InputGroup>
                    <Label>Descrição *</Label>
                    <Input
                        value={formData.description}
                        onChange={handleChange}
                        name="description"
                    />
                    {errors.description && <ErrorText>{errors.description}</ErrorText>}
                </InputGroup>

                <InputGroup>
                    <Label>Data e Hora *</Label>
                    <Input
                        type="datetime-local"
                        name="dateTimeQuery"
                        value={formData.dateTimeQuery}
                        onChange={handleChange}
                    />
                    {errors.dateTimeQuery && <ErrorText>{errors.dateTimeQuery}</ErrorText>}
                </InputGroup>

                <InputGroup>
                    <Label>Médico *</Label>
                    <select
                        style={{ height: '2.5rem', borderRadius: '4px' }}
                        value={formData.id_doctor}
                        onChange={handleChange}
                        name="id_doctor"
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
                    <BackButton onClick={() => navigate("/homePaciente")}>Voltar</BackButton>
                    <CustomButton onClick={handleSubmit} type="submit">
                        Agendar
                    </CustomButton>
                </div>
            </FormWrapper>
        </Container>
    );
}
