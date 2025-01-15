import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import MedicoHome from "../pages/HomeMedico";
import VisualizarConsultas from "../pages/VisualizarConsultasMedico";
import Perfil from "../pages/Perfil";
import PacienteHome from "../pages/HomePaciente";
import VisualizarConsultasPaciente from "../pages/VisualizarConsultasPaciente";
import AgendamentoConsulta from "../pages/AgendamentoConsulta";
import NotFound from "../pages/NotFound";
import NaoAutenticado from "../pages/NaoAutenticado";
import { PrivateRoutes } from "../context/privateRoutes";


export default function AppRoutes() {
    return (

        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route element={<NaoAutenticado />} path="/NotAuthenticated" />


            <Route path="/" element={<Login />}></Route>
            <Route path="/cadastro" element={<Cadastro />}></Route>

            <Route element={<PrivateRoutes />}>
                <Route path="/homeMedico" element={<MedicoHome />}></Route>
                <Route path="/visualizar-consulta" element={<VisualizarConsultas />}></Route>
            </Route>


            <Route path="/homePaciente" element={<PacienteHome />}></Route>
            <Route path="/visualizar-consulta-paciente" element={<VisualizarConsultasPaciente />}></Route>
            <Route path="/perfil" element={<Perfil />}></Route>
            <Route path="/agendamento-consulta" element={<AgendamentoConsulta />}></Route>


        </Routes >
    );
}