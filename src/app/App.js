import { Header } from './../components/header';
import { Main } from './../components/main/Main.js';
import React, { useState, useEffect } from 'react';
// import { pythonConnection } from './../services/caPython.js'

import './App.css';

function App() {
	const [data, setData] = useState([]);
	/*
	  useEffect(() => {
		pythonConnection().then(
		  data => {
			setData(data);
			console.log(data)
		  }
		)
		  .catch((error) => {
			console.log(error);
		  });
	  }, []);*/

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