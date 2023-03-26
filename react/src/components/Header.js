import React from 'react';

import '../header.css'
export class Header extends React.Component {
    render() {
        return (
            <header>
                <h1>CAUDAL AMBIENTAL</h1>
                <p className="subtitle-note">Herramienta para el calculo de caudal ambiental y porcentaje de aprovechamiento en cualquier punto de una cuenca</p>
            </header>
        )
    }
}