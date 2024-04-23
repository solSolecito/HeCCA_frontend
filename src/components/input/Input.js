import React, { useState } from 'react';
import * as validate from '../../utils/validations';
import * as units from '../../utils/units';

export function Input(props) {
	// Types: csv, area, time

	let inputElement = <></>

	switch (props.type) {
		case 'csv':
			inputElement = <InputFileCsv
				{...props}
			/>
			break;
		case 'area':
			inputElement = <InputArea
				{...props}
			/>
			break;
		case 'time':
			inputElement = <InputTime
				{...props}
			/>
			break;
		default:
			inputElement = <div>
				<label htmlFor={props.id}>{props.label}</label>
				<input
					id={props.id}
					name={props.id}
				/>
			</div>
			break;
	}

	return (inputElement);
}

/* csv */

function InputFileCsv(props) {
	const [data, setData] = useState({});
	const [errMsg, setErrMsg] = useState('');
	const [errVisibility, setErrVisibility] = useState(false);

	function changeInput(e) {
		setData(e.target.files[0]);
		console.log(data)
		const validation = validate.csv(data);
		props.onChange({ data, valid: validation.valid });
		setErrMsg(validation.msg);
		setErrVisibility(!validation.valid);
	}

	return (
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<input
				id={props.id}
				name={props.id}
				required={props.required}
				onChange={(e) => {
					setTimeout(() => {
						changeInput(e)
					}, 3000);
				}}
				type='file'
				accept=".csv, .xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
				alt='Buscar en mi equipo'
				placeholder='No se ha seleccionado ningún archivo'
			/>
			<p className={`message${errVisibility ? '' : ' invisible'}`} id={`msg-${props.id}`}>{errMsg}</p>
		</div>
	);
}

/* area */

function InputArea(props) {
	const [value, setValue] = useState(0);
	const [unit, setUnit] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [errVisibility, setErrVisibility] = useState(false);

	function changeSomething () {
		const validation = validate.unit(value, units.area);
		if(validation.valid) {
			props.onChange(preprocessArea(value, unit));
		} else {
			props.onChange({data: 0, valid: false});
		}
		setErrMsg(validation.msg)
		setErrVisibility(!validation)
	}

	function changeUnit(e) {
		setUnit(e.target.value)
		changeSomething();
	}

	function changeInput(e) {
		setValue(e.target.value)
		changeSomething()
	}

	return (
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<div>
				<input
					id={props.id}
					name={props.id}
					type='number'
					className="dim-input"
					required={props.required}
					onChange={changeInput}
				/>
				<select
					id={`${props.id}-unit`}
					name={`${props.id}-unit`}
					className="dim-select"
					required={props.required}
					onChange={changeUnit}
				>
					{
						units.area.map(op => {
							return <option value={op.value}>{op.label}</option>
						})
					}
				</select>
			</div>
			<p className={`message${errVisibility ? '' : ' invisible'}`} id={`msg-${props.id}`}>{errMsg}</p>
		</div>
	);
}

function validateArea(area) {
	const min = 25;
	const max = 8000000;
	// Pasa un warning si el area es menor a 25 km2
	if (area < min) {
		console.log("WARN: Estás trabajando con una microcuenca");
		return {
			valid: true,
			msg: 'Estás trabajando con una microcuenca'
		}
	} else if (area > max) {
		console.log("ERROR: El area ingresada es mayor al area de la cuenca del Amazonas");
		return {
			valid: false,
			msg: 'Estás trabajando con un area mayor a la cuenca del Amazonas'
		}
	}
	return {
		valid: true,
		msg: 'Todo en orden'
	}
}

function preprocessArea(value, unit) {
	validate.number(value);
	const km2 = units.area.find(un => un.value === unit).toKm2(value);
	return {
		data: km2,
		valid: validateArea(km2).valid
	}
}

/* time */

function InputTime(props) {
	const [value, setValue] = useState(0);
	const [unit, setUnit] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [errVisibility, setErrVisibility] = useState(false);

	function changeSomething () {
		const validation = validate.unit(value, units.area);
		if(validation.valid) {
			props.onChange(preprocessQ(value, unit));
		} else {
			props.onChange({data: 0, valid: false});
		}
		setErrMsg(validation.msg)
		setErrVisibility(!validation)
	}


	function changeUnit(e) {
		setUnit(e.target.value)
		changeSomething();
	}

	function changeInput(e) {
		setValue(e.target.value)
		changeSomething();
	}

	return (
		<div>
			<label htmlFor={props.id}>{props.label}</label>
			<div>
				<input
					id={props.id}
					name={props.id}
					type='number'
					className="dim-input"
					required={props.required}
					onChange={changeInput}
				/>
				<select
					id={`${props.id}-unit`}
					name={`${props.id}-unit`}
					className="dim-select"
					required={props.required}
					onChange={changeUnit}
				>
					{
						units.time.map(op => {
							return <option value={op.value}>{op.label}</option>
						})
					}
				</select>
			</div>
			<p className={`message${errVisibility ? '' : ' invisible'}`} id={`msg-${props.id}`}>{errMsg}</p>
		</div>
	);
}

function preprocessQ(value, unit) {
	const val = validate.number(value);
	const years = units.time.find(un => un.value === unit).toYear(value);
	return {
		data: years,
		valid: val.valid
	}
}
