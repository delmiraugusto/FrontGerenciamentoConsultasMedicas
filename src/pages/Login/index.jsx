import { useState, useContext } from 'react';
import { BsEye, BsEyeSlash } from "react-icons/bs";
const foto = new URL("../../assets/iconHospital.png", import.meta.url);
import { Form, InputGroup } from 'react-bootstrap';
import apiService from '../../api/api';
import {
    Container, Forme,
    Imagem, Accessibility,
    AccessibilityContainer,
    Titulo,
    ButtonEntrar,
    TextoEntrar,
    Logo,
    TextoCadastro,
    TextoClique,
} from "./style";
import { HiOutlineLockClosed } from 'react-icons/hi';
import { ThemeContext } from '../../context/themeContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../../context/AuthContext';
export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { switchTheme, isDarkMode } = useContext(ThemeContext);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);



    const handlePasswordToggle = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    };

    const handlePasswordButton = (
        <a onClick={handlePasswordToggle} >
            {showPassword ? (
                <BsEye />
            ) : (
                <BsEyeSlash />
            )}
        </a>
    )

    const handleLogin = async (e) => {
        e.preventDefault();


        if (!email || !password) {
            alert("Preencha todos os campos.");
            return;
        }

        // try {

        // const response = await apiService.login({ email, password });
        // const token = response.data;

        //     if (token) {
        //         localStorage.setItem('token', token);

        //         const decodedToken = jwt_decode(token);
        //         const userRole = decodedToken?.role;

        //         setTimeout(() => {
        //             if (userRole === 'Medico') {
        //                 navigate("/homeMedico");
        //             } else if (userRole === 'Paciente') {
        //                 navigate("/homePaciente");
        //             }
        //         }, 2000);

        //         alert("Login Realizado com Sucesso!");
        //     } else {
        //         alert("Token não encontrado.");
        //     }
        // }
        // catch (error) {
        //     alert("Email e/ou Senha Inválidos.");
        // }
        await login(email, password);
    };

    const handleGoCadastro = () => {
        navigate("/cadastro");
    };

    return (
        <Container>
            <Imagem src={foto} alt="icon_Hospital" />
            <Forme onSubmit={handleLogin}>
                <Logo src={foto} alt="icon_Hospital" />
                <Titulo>Gerenciamento de Consultas</Titulo>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    <Form.Control
                        placeholder="Email"
                        aria-label="Email"
                        tabIndex="1"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon3"><HiOutlineLockClosed /></InputGroup.Text>
                    <Form.Control
                        type={showPassword ? 'text' : 'password'}
                        tabIndex="2"
                        placeholder="Senha"
                        aria-label="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputGroup.Text id="basic-addon5">{handlePasswordButton}</InputGroup.Text>
                </InputGroup>
                <ButtonEntrar type="submit" tabIndex="4" aria-label="botao entrar">
                    <TextoEntrar>Entrar</TextoEntrar>
                </ButtonEntrar>
                <TextoCadastro>Não Possui Cadastro?                <TextoClique onClick={handleGoCadastro}>Clique aqui</TextoClique></TextoCadastro>

            </Forme>
        </Container >
    );
}