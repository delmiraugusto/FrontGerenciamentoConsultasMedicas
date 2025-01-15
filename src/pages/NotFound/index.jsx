import React from 'react'
import "./style.css"

const foto = new URL("../../assets/foundNot.png", import.meta.url)

export default function NotFound() {
    return (
        <div className='containerFound'>
            <img src={foto} alt="foto pagina nao encontrada" />
        </div>
    )
}