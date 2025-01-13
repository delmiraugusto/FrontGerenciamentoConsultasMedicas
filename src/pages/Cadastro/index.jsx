import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import apiService from '../../api/api';
import {
    Container,
    FormWrapper,
    Title,
    InputGroup,
    Label,
    Input,
    CheckboxWrapper,
    ErrorText,
} from './style';

export default function Cadastro() {
    const [formData, setFormData] = useState({
        name: '',
        cpf: '',
        telephone: '',
        email: '',
        password: '',
        crm: '',
        specialty: '',
        age: '',
        role: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'O campo name é obrigatório';
        if (!formData.cpf || formData.cpf.length !== 11) newErrors.cpf = 'O CPF deve ter 11 dígitos';
        if (!formData.telephone) newErrors.telephone = 'O campo Número é obrigatório';
        if (!formData.email) newErrors.email = 'O campo Email é obrigatório';
        if (!formData.password || formData.password.length < 8) newErrors.password = 'A senha deve ter no mínimo 8 caracteres';
        if (!formData.role) newErrors.role = 'É obrigatório escolher Médico ou Paciente';

        if (formData.role === 'Medico') {
            if (!formData.crm || formData.crm.length < 4 || formData.crm.length > 6) {
                newErrors.crm = 'O CRM deve ter entre 4 e 6 caracteres';
            }
        }

        if (formData.role === 'Paciente') {
            if (!formData.age) newErrors.age = 'O campo idade é obrigatório';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        const filteredFormData = { ...formData };

        if (formData.role === 'Medico') {
            delete filteredFormData.age;
        } else if (formData.role === 'Paciente') {
            delete filteredFormData.crm;
            delete filteredFormData.specialty;
        }

        try {
            const response = await apiService.signUp(formData);
            alert('Cadastro realizado com sucesso!');
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (error) {
            if (error.response) {
                alert(`Erro: ${error.response.data.message || 'Erro ao realizar cadastro.'}`);
            } else if (error.request) {
                alert('Erro: Não foi possível conectar ao servidor.');
            } else {
                alert(`Erro desconhecido: ${error.message}`);
            }
        }
    };

    return (
        <Container>
            <FormWrapper onSubmit={handleSubmit}>
                <Title>Cadastro</Title>
                <InputGroup>
                    <Label>name *</Label>
                    <Input name="name" value={formData.name} onChange={handleChange} />
                    {errors.name && <ErrorText>{errors.name}</ErrorText>}
                </InputGroup>

                <InputGroup>
                    <Label>CPF *</Label>
                    <Input name="cpf" value={formData.cpf} onChange={handleChange} maxLength={11} />
                    {errors.cpf && <ErrorText>{errors.cpf}</ErrorText>}
                </InputGroup>

                <InputGroup>
                    <Label>Número *</Label>
                    <Input name="telephone" value={formData.telephone} onChange={handleChange} />
                    {errors.telephone && <ErrorText>{errors.telephone}</ErrorText>}
                </InputGroup>

                <InputGroup>
                    <Label>Email *</Label>
                    <Input name="email" value={formData.email} onChange={handleChange} />
                    {errors.email && <ErrorText>{errors.email}</ErrorText>}
                </InputGroup>

                <InputGroup>
                    <Label>password *</Label>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} />
                    {errors.password && <ErrorText>{errors.password}</ErrorText>}
                </InputGroup>

                <CheckboxWrapper>
                    <Form.Check
                        inline
                        label="Médico"
                        type="radio"
                        name="role"
                        value="Medico"
                        onChange={handleChange}
                    />
                    <Form.Check
                        inline
                        label="Paciente"
                        type="radio"
                        name="role"
                        value="Paciente"
                        onChange={handleChange}
                    />
                </CheckboxWrapper>
                {errors.role && <ErrorText>{errors.role}</ErrorText>}

                {formData.role === 'Medico' && (
                    <>
                        <InputGroup>
                            <Label>CRM *</Label>
                            <Input name="crm" value={formData.crm} onChange={handleChange} />
                            {errors.crm && <ErrorText>{errors.crm}</ErrorText>}
                        </InputGroup>
                        <InputGroup>
                            <Label>specialty *</Label>
                            <Input name="specialty" value={formData.specialty} onChange={handleChange} />
                        </InputGroup>
                    </>
                )}

                {formData.role === 'Paciente' && (
                    <InputGroup>
                        <Label>age *</Label>
                        <Input name="age" value={formData.age} onChange={handleChange} />
                        {errors.age && <ErrorText>{errors.age}</ErrorText>}
                    </InputGroup>
                )}

                <Button type="submit">Cadastrar</Button>
            </FormWrapper>
        </Container>
    );
}
