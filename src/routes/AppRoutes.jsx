import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Teste from "../pages/Teste/teste";
import Cadastro from "../pages/Cadastro";


export default function AppRoutes() {
    return (

        <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/teste" element={<Teste />}></Route>
            <Route path="/cadastro" element={<Cadastro />}></Route>

        </Routes>
    );
}