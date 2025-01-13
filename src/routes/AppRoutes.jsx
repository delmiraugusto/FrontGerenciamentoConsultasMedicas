import { Route, Routes } from "react-router-dom";
import Login from "../pages/Login";


export default function AppRoutes() {
    return (

        <Routes>
            <Route path="/" element={<Login />}></Route>
        </Routes>
    );
}