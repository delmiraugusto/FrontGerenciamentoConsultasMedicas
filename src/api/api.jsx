import axios from "axios";
const API_BASE_URL = "https://localhost:7135/api";

const getToken = () => {
    return localStorage.getItem("token");
}

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response, (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

const apiService = {
    // AuthController
    login: (credentials) => api.post('auth/login', credentials),
    signUp: (registrationData) => api.post('auth/signUp', registrationData),

    // ConsultController
    getConsultByPatient: (patientId) => api.get(`consult/patientConsults/${patientId}`),
    getConsultByDoctor: (doctorId) => api.get(`consult/doctorConsults/${doctorId}`),
    getConsultById: (id) => api.get(`consult/${id}`),
    addConsult: (consultData) => api.post('consult', consultData),
    updateConsult: (id, consultData) => api.put(`consult/${id}`, consultData),
    deleteConsult: (id) => api.delete(`consult/${id}`),

    // DoctorController
    getAllDoctors: () => api.get('doctor'),
    getDoctorById: (id) => api.get(`doctor/${id}`),
    getDoctorByEmail: (email) => api.get(`doctor/email/${email}`),
    updateDoctor: (id, doctorData) => api.put(`doctor/${id}`, doctorData),
    deleteDoctor: (id) => api.delete(`doctor/${id}`),

    // PatientController
    getAllPatients: () => api.get('patient'),
    getPatientById: (id) => api.get(`patient/${id}`),
    getPatientByEmail: (email) => api.get(`patient/emailPatient/${email}`),
    updatePatient: (id, patientData) => api.put(`patient/${id}`, patientData),
    deletePatient: (id) => api.delete(`patient/${id}`),
};

export default apiService;
