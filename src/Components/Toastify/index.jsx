import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./style.css";

function ToastifyAlert(notification) {
    return (
        <div style={{
            position: "absolute", backgroundColor: "transparent", right: 0
        }}>
            <ToastContainer
                className="alert"
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div >
    )
}

export default ToastifyAlert;