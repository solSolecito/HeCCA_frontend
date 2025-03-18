import React from 'react';
import './styles.css';

import logo from "../../assets/logo_SIHU.png";

export class Header extends React.Component {
    /* 2 headers:  
    - El de SIHU
    - El del proyecto individual */

    render() {
        return (
            <header className='header-section'>

                <div className='header-sihu'>
                    <p>Un proyecto de </p>
                    <img src={logo} alt='Logo Semillero SIHU' />
                </div>

                <div className='header-project'>
                    <div className='project-info'>
                        <h1>{this.props.title}</h1>
                        <small>Versión {this.props.version}</small>
                    </div>
                    <p className='subtitle-note'>{this.props.subtitle}</p>
                </div>
            </header>
        )
    }
}