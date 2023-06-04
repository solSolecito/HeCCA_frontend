import React from 'react';

import './header.css'; 

import logo from "./../../images/Logo.png" ; 
export class Header extends React.Component {
    render() {
        return (
            <header className='header-section'>
                <div className='header-section_name'>
                    <h1>HeCCA</h1>
                    <small>Versión 2.0</small>
                </div>
                
                <div>
                    <p className='subtitle-note'>Herramienta para el calculo de Caudal Ambiental </p>
                </div>

                <div className='header-section_brand'>
                    <p>Un proyecto de </p>
                    <img src={logo} alt='Logo Semillero SIHU'/>
                </div>
            </header>
        )
    }
}