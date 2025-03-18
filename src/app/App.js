import React from 'react';
import { Header } from './../components/header';
import { Main } from './../components/main/index.js'; 
import './App.css';

/*
App tiene 3 partes: Header, Main y Footer.
El header indica dónde estamos
Main es el contenido, que puede ser de 2 tipos: Calculadora (ruta calc) o Informativo (ruta info)
El footer es una barra que debe contener un menú, configuración y botón de ayuda
*/ 

// PENDIENTE: crear un menú como footer.

function App() {
	return (
		<div className="App">
			<Header
				title="HeCCA"
				version="2.0"
				subtitle="Herramienta para el Cálculo de Caudal Ambiental"
			/>
			<Main />
		</div>
	);
}

export default App;