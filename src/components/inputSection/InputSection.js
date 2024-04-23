import React, { useState } from 'react';
import { Fieldset } from '../fieldset';
import { Input } from '../input/Input';
import './styles.css';

export function InputSection() {
	// Cuenca Base
	const [baseFile, setBaseFile] = useState({ data: {}, valid: false});
	// Cuenca de Comparación
	const [compFile, setCompFile] = useState({ data: {}, valid: false});
	const [baseArea, setBaseArea] = useState({ data: 0, valid: false});
	const [compArea, setCompArea] = useState({ data: 0, valid: false});
	// Umbrales
	const [qb, setQb] = useState({ data: -1, valid: false});
	const [qtq, setQtq] = useState({ data: -1, valid: false});

	const data = {
		files: { baseFile: baseFile.data, compFile: compFile.data },
		areas: { baseArea: baseArea.data, compArea: compArea.data },
		umbrales: { qb: qb.data, qtq: qtq.data }
	}

	const formProps = [
		{
			title: "Serie Cuenca Base",
			legend: "Inserte Serie de la Cuenca Base",
			check: false,
			checklabel: '',
			id: '',
			inputs: [
				{
					id: 'base-file',
					type: 'csv',
					label: 'Seleccione el archivo con la serie de Caudales',
					required: true,
					onChange: (file) => setBaseFile(file)
				}
			]
		},
		{
			title: "Serie Cuenca de Comparación",
			legend: "Inserte una cuenca de comparación para rellenar datos faltantes",
			check: true,
			checkLabel: "Tengo una cuenca de comparación",
			id: "serie-alt",
			inputs: [
				{
					id: 'comp-file',
					type: 'csv',
					label: 'Seleccione el archivo con la serie de Caudales de una cuenca de comparación',
					required: false,
					onChange: (file) => setCompFile(file)
				},
				{
					id: 'base-area',
					type: 'area',
					label: 'Area de la cuenca base',
					required: false,
					onChange: (area) => setBaseArea(area.area)
				},
				{
					id: 'comp-area',
					type: 'area',
					label: 'Area de la cuenca de comparación',
					required: false,
					onChange: (area) => setCompArea(area.area)
				}
			]
		},
		{
			title: "Umbrales Morfometricos",
			legend: "Umbrales Morfometricos",
			check: true,
			checkLabel: "Tengo un modelo hidraulico de mi cuenca base",
			id: "umbrales",
			inputs: [
				{
					id: 'qb',
					type: 'time',
					required: false,
					label: 'Qb',
					onChange: (q) => setQb(q)
				},
				{
					id: 'qtq',
					type: 'time',
					required: false,
					label: 'Qtq',
					onChange: (q) => setQtq(q)
				}
			]
		},
	]

	function readCSV(csvFile) {
		const reader = new FileReader();
		reader.readAsText(csvFile);
		// Load event
		let csvColumns = {};
		reader.onload = function (event) {
			// Read file data
			const csvdata = event.target.result;
			// Split by line break to gets rows Array
			const rowData = csvdata.split('\n');
			// Leer los encabezados
			let headers = rowData[0].split(','); 
			let data = [];
			// Loop on the row Array (change row=0 if you also want to read 1st row)
			for (let row = 0; row < rowData.length; row++) {
				// Split by comma (,) to get column Array
				data[row] = rowData[row].split(',');
			}

			// Transponer DATA
			let transposeData = new Array(data[0].length);
			// Necesitamos inicializar cada elemento del arreglo columns como un array
			// para poder utilizar push en el ciclo que extrae las columnas.
			for (let j = 0; j < transposeData.length; j++) {
				transposeData[j] = [data[0][j]];
			}
			// Iteramos todas las filas de la matrix
			for (let i = 1; i < data.length; i++) {
				// Iteramos todas las columnas    
				for (let j = 0; j < transposeData.length; j++) {
					transposeData[j].push(data[i][j]);
				}
			}

			for (let j = 0; j < transposeData.length; j++) {
				csvColumns[transposeData[j][0]] = transposeData[j].slice(1);
			}
		}
		return csvColumns;
	}

	function calcule(e) {
		e.preventDefault();
		// Ya recogí datos y los validé
		console.log(data)
		// Llama a servicio uploadFiles. 
		// Este sube los 2 csv a firebase y al finalizar envia un objeto con los datos al python.

		/*
			El llamado a API deberia enviar los siguientes parametros:
			( { csv, area }, compare = false, { csv, area } = {} )
			y recibiria un arreglo de porcentajes de aprovechamiento
			*/
		// processDataService(cuencaBase.csv);
		// pythonConnection( readCSV(cuencaBase.csv) )
		console.log('Calculando')
	}

	return (
		<section className="input">
			<form>
				{
					formProps.map(fsProps => {
						return <Fieldset {...fsProps}>
							{fsProps.inputs.map(inputProps => {
								return <Input {...inputProps} />
							})}
						</Fieldset>
					})
				}
				<div className='container-btns'>
					<button className='btn btn-main' onClick={calcule}>Calcular</button>
				</div>
			</form>
		</section>
	);
}

/*
	<fieldset title="Modelo Hidraulico">
		<legend>Modelo Hidraulico de la Cuenca</legend>
	</fieldset>
	<fieldset title="Tipologias">
		<legend>Tipo de los rios pertenecientes a la cuenca</legend>
	</fieldset>
	<fieldset title="Umbrales Morfometricos">
		<legend>Tipo de los rios pertenecientes a la cuenca</legend>
		<div>
			<label htmlFor="inp-qb">Qb</label>
			<input className="compare-input__input" id="inp-qb" name="inp-qb" type={"number"}></input>
		</div>
		<div>
			<label htmlFor="inp-qtq">Qtq</label>
			<input className="compare-input__input" id="inp-qtq" name="inp-qtq" type={"number"}></input>
		</div>
	</fieldset>
*/


function calcule(e) {
	// Recoge datos y los valida
	e.preventDefault();

	console.log('Calculando')

	// Llama a API.
	/*
		El llamado a API deberia enviar los siguientes parametros:
		( { csv, area }, compare = false, { csv, area } = {} )
		y recibiria un arreglo de porcentajes de aprovechamiento
		*/
	// processDataService(cuencaBase.csv);
	// pythonConnection( readCSV(cuencaBase.csv) )
} // 407