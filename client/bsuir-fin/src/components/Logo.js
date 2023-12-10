import React from "react";
import logoImage from "../style/img/logo.png"

export default function Logo() {
    return (
        <div style={{ textAlign: 'center', marginTop: '5px' }}>
            <img src={logoImage} alt="Логотип" style={{ width: '550px', height: 'auto' }} />
        </div>
    );
}