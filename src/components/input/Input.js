import React from 'react';
import './styles.css';
import loadDataImage from '../../images/loadData.png';

export class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			file: props.file ? props.file : 'No se han seleccionado archivos',
			error: props.error ? props.error : '',
			errorClassList: props.errorClassList ? props.errorClassList : 'window closed',
			warn: props.warn ? props.warn : '',
			warnClassList: props.warnClassList ? props.warnClassList : 'window closed',
			outputClassList: props.outputClassList ? props.outputClassList : 'mock invisible',
		}
		this.calcule = this.calcule.bind(this);
		this.setVisFileAlt = this.setVisFileAlt.bind(this);
	}

	render() {
		return (
			<section className="input">
				<h2>Carga de Datos</h2>
				<form>

					<fieldset title="Serie Cuenca Base">
						<legend>Inserte Serie de la Cuenca Base</legend>
						<p>
							<label for="inp-file"> Buscar en mi equipo </label>
							<input
								id="inp-file"
								name="inp-file"
								type={'file'} accept=".csv, .xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
								alt="Seleccionar serie de datos"
								placeholder="No se han seleccionado archivos"
								required
							/>
						</p>
						<p>
							<input id="inp-checker-alt" name="inp-checker-alt" type="checkbox" onChange={this.setVisFileAlt} />
							<label for="inp-checker-alt">Tengo una cuenca de comparación</label>
						</p>
						<p className="message invisible" id="msg-fs-file"></p>
					</fieldset>

					<fieldset id="fs-file-alt" title="Serie Cuenca Alt" className="invisible">
						<legend>Inserte Serie de la Cuenca de Comparación</legend>
						<p>
							<label for="inp-file-alt"> Buscar en mi equipo </label>
							<input
								id="inp-file-alt"
								name="inp-file-alt"
								type={'file'} accept=".csv, .xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
								alt="Seleccionar serie de datos"
								placeholder="No se han seleccionado archivos"
							/>
						</p>
						<p className="message invisible" id="msg-fs-file-alt"></p>
					</fieldset>

					<fieldset id="fs-areas" title="Areas" className='invisible'>
						<legend>Inserte Areas de las cuencas a comparar</legend>
						<div>
							<div className='cont-area'>
								<label for="inp-area">Area Cuenca Base</label>
								<div>
									<input className="compare-input__input" id="inp-area" name="inp-area" type={"number"}></input>
									<select className="compare-input__select" id="inp-units">
										<option value={'m'}>m²</option>
										<option value={'ha'}>ha²</option>
										<option value={'km'}>km²</option>
										<option value={'ft'}>ft²</option>
										<option value={'mi'}>mi²</option>
									</select>
								</div>
							</div>
							<div className='cont-area'>
								<label for="inp-area-alt">Area Cuenca de Comparación</label>
								<div>
									<input className="compare-input__input" id="inp-area-alt" name="inp-area-alt" type={"number"}></input>
									<select className="compare-input__select" id="inp-units-alt">
										<option value={'m'}>m²</option>
										<option value={'ha'}>ha²</option>
										<option value={'km'}>km²</option>
										<option value={'ft'}>ft²</option>
										<option value={'mi'}>mi²</option>
									</select>
								</div>
							</div>
						</div>
						<p className="message invisible" id="msg-fs-areas"></p>
					</fieldset>
					
					<fieldset title="Modelo Hidraulico">
						<legend>Modelo Hidraulico de la Cuenca</legend>

					</fieldset>
					<fieldset title="Tipologias">
						<legend>Tipo de los rios pertenecientes a la cuenca</legend>

					</fieldset>
					<button onClick={this.calcule}>Calcular</button>
				</form>
			</section>
		);
	}
	
	setVisibility(id, visible) {
		const div = document.getElementById(id);
		try {
			if (visible) {
				div.classList.remove('invisible');
			} else {
				div.classList.add('invisible');
			}
		} catch (error) {
			console.log(error);
		}
	}

	setMsg(id, msg) {
		const msgDiv = document.getElementById(id);
		try {
			if (msg == "") {
				this.setVisibility(id, false);
			} else {
				msgDiv.innerHTML = msg;
				this.setVisibility(id, true);
			}
		} catch (error) {
			console.log(error);
		}
	}

	setVisFileAlt(e) {
		const checked = e.target.checked;
		this.setVisibility('fs-file-alt', checked)
		this.setVisibility('fs-areas', checked)
	}

	validateCsv(file) {
		const validFileTypes = [
			"csv",
			"xslx",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		];
		// Revisa que se haya subido un archivo
		console.log("Validando formato de archivo de ", file.name);

		if (!file) {
			console.log("ERROR: No se ha subido ningun archivo");
			return {
				valid: false,
				msg: 'No se ha subido ningun archivo'
			};
		}

		// Revisa que el archivo sea csv
		const extension = file.type ? file.type : file.name.split(".").pop();
		if (validFileTypes.indexOf(extension) === -1) {
			console.log("ERROR: El archivo no es un csv");
			return {
				valid: false,
				msg: 'El archivo no es un csv'
			};
		}

		// Revisa encabezado

		// Llama a API para com´probar años

		// Si se retorna false deberia saltar un error.
		return {
			valid: true,
			msg: ''
		};
	}

	areaToKm2(area, units) {
		let areakm2;
		switch (units) {
			case "km":
				areakm2 = area;
				break;
			case "m":
				areakm2 = area / 1000000;
				break;
			case "ha":
				areakm2 = area / 10000;
				break;
			default:
				areakm2 = area;
				break;
		}
		this.validateDimensions(areakm2);
		return areakm2;
	}

	validateNum(num, positive = true) {
		console.log("Validando valores de area");

		// Revisar que las areas sean números.
		if (isNaN(num * 1)) {
			// this.setError( 'El area no es un número valido' );
			console.log("ERROR: El area ingresada no es un número");
			return {
				valid: false,
				msg: 'El area ingresada no es un número'
			};
		}

		// Revisar que las areas sean mayores a cero.
		if (positive && num < 0) {
			// this.setError('El area no es un número valido');
			console.log("ERROR: El area ingresada es menor a cero");
			return {
				valid: false,
				msg: 'El area ingresada es menor a cero'
			};
		}
		return {
			valid: true,
			msg: ''
		};
	}

	validateDimensions(area) {
		console.log("Validando dimensiones");
		const min = 25;
		const max = 8000000;

		// Pasa un warning si el area es menor a 25 km2
		if (area < min) {
			console.log("WARN: Estás trabajando con una microcuenca");
			return {
				valid: false,
				msg: 'Estás trabajando con una microcuenca'
			};
		} else if (area > max) {
			// this.setWarn( 'El area ingresada es mayor al area de la cuenca del Amazonas.' );
			console.log(
				"WARN: El area ingresada es mayor al area de la cuenca del Amazonas"
			);
			return {
				valid: false,
				msg: 'El area ingresada es mayor al area de la cuenca del Amazonas'
			};
		}
		return {
			valid: true,
			msg: ''
		};
	}

	enableOutput() {
		const arrayAux = this.state.outputClassList.split(" ");
		const index = arrayAux.indexOf("invisible");
		if (index !== -1) {
			arrayAux.splice(index, 1);
			this.setState({ outputClassList: arrayAux.join(" ") });
		}
	}

	disableOutput() {
		const arrayAux = this.state.outputClassList.split(" ");
		const index = arrayAux.indexOf("invisible");
		if (index === -1) {
			arrayAux.push("invisible");
			this.setState({ outputClassList: arrayAux.join(" ") });
		}
	}

	calcule(e) {
		
		// Recoge datos y los valida
		e.preventDefault();

		const cuencaBase = {
			csv: document.getElementById("inp-file").files[0],
		};

		const cuencaAlt = {};

		const validationBase = this.validateCsv(cuencaBase.csv);
		this.setMsg("msg-fs-file", validationBase.msg);

		if (!validationBase.valid) {
			return [];
		}

		const compare = document.getElementById("inp-checker-alt").checked;

		// if(this.state.compare) {
		if (compare) {

			//Validación de csv
			cuencaAlt.csv = document.getElementById("inp-file-alt").files[0];

			const validationAlt = this.validateCsv(cuencaAlt.csv);
			this.setMsg('msg-fs-file', validationAlt.msg);

			if (!validationBase.valid) {
				return [];
			}

			const areaBase = document.getElementById("inp-area").value;
			const areaAlt = document.getElementById("inp-area-alt").value;

			const validationAreas = [this.validateNum(parseFloat(areaBase)), this.validateNum(parseFloat(areaAlt))];
			this.setMsg('msg-fs-areas', validationAreas[0].valid ? validationAreas[1].msg : validationAreas[0].msg );

			if ( validationAreas.find(a => !a.valid) ) {
				return [];
			} 

			const unitsBase = document.getElementById("inp-units").value;
			const unitsAlt = document.getElementById("inp-units-alt").value;
			cuencaBase.area = this.areaToKm2(areaBase, unitsBase);
			cuencaAlt.area = this.areaToKm2(areaAlt, unitsAlt);
			
			const validationDims = [this.validateDimensions(cuencaBase.area), this.validateDimensions(cuencaAlt.area)];
			this.setMsg('msg-fs-areas', validationDims[0].valid ? validationDims[1].msg : validationDims[0].msg );
		}

		// Llama a API.
		/*
			El llamado a API deberia enviar los siguientes parametros:
			( { csv, area }, compare = false, { csv, area } = {} )
			y recibiria un arreglo de porcentajes de aprovechamiento
			*/
	}
}
