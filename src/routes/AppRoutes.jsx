import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Teste from "../pages/Teste/teste";
import Cadastro from "../pages/Cadastro";
import MedicoHome from "../pages/HomeMedico";
import VisualizarConsultas from "../pages/VisualizarConsultasMedico";
import Perfil from "../pages/Perfil";
import PacienteHome from "../pages/HomePaciente";
import VisualizarConsultasPaciente from "../pages/VisualizarConsultasPaciente";


export default function AppRoutes() {
    return (

        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/teste" element={<Teste />}></Route>
            <Route path="/cadastro" element={<Cadastro />}></Route>
            <Route path="/homeMedico" element={<MedicoHome />}></Route>
            <Route path="/homePaciente" element={<PacienteHome />}></Route>
            <Route path="/visualizar-consulta" element={<VisualizarConsultas />}></Route>
            <Route path="/visualizar-consulta-paciente" element={<VisualizarConsultasPaciente />}></Route>
            <Route path="/perfil" element={<Perfil />}></Route>


        </Routes>
    );
}