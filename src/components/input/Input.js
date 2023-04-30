import React from 'react';
import { PopUpText } from '../PopUpWindow';

import './input.css';
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
		//this.setWarn = this.setWarn.bind(this);
		//this.setError = this.setError.bind(this);
	}

	/* <p><button>Buscar en Drive</button></p>
	  <p>{this.state.file}</p> */

	render() {
		return (
			<section className="input">
				<h2>Carga de Datos</h2>
				<form>
					<fieldset title="Serie Cuenca Base">
						<legend>Inserte Serie de la Cuenca Base</legend>

					</fieldset>
					<fieldset title="Serie Cuenca Alt">
						<legend>Inserte Serie de la Cuenca de Comparación</legend>

					</fieldset>
					<fieldset title="Areas">
						<legend>Inserte Serie de la Cuenca de Comparación</legend>

					</fieldset>
					<fieldset title="Modelo Hidraulico">
						<legend>Modelo Hidraulico de la Cuenca</legend>

					</fieldset>
					<fieldset title="Tipologias">
						<legend>Tipo de los rios pertenecientes a la cuenca</legend>

					</fieldset>
					<button>Calcular</button>
				</form>
			</section>

			/*
			  <>
				  <section>
					  <form>
				{/* <fieldset>
								<label>Importe la serie de la cuenca base</label>
								<p>
									<label>Buscar en mi equipo</label>
									<input id="fileBase" type={'file'} accept=".csv, .xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ></input>
								</p>
	  
							</fieldset>
							<fieldset>
								<input id="compare" type={'checkbox'}></input>
								<label>Tengo una cuenca de comparación.</label>
							</fieldset>
							<fieldset className="compare-input">
								<label>Importe la serie de la cuenca de comparación</label>
								<p>
									<label>Buscar en mi equipo</label>
									<input id="fileComp" type={'file'} accept=".csv, .xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"></input>
								</p>
	  
							</fieldset> }
	  
			   <div className="input-section">
			   
				<div className="input-section_itemLarge">
				  <h3 className="input-section_itemTitle">
					Importe la serie de la cuenca base
				  </h3>
				  <div className="input-section_itemContainer">
					<input
					  name="fileBase"
					  id="fileBase"
					  type={"file"}
					  className="inputfile"
					  data-multiple-caption="{count} files selected"
					  accept=".csv, .xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					/>
					<label htmlFor="fileBase">
					  <figure>
						<img src={loadDataImage} alt="cloud data send" />
					  </figure>
					  <span>Buscar en mi equipo</span>
					</label>
				  </div>
				</div>
	  
				<div className="input-section_itemLarge" id="BasinComp">
				  <h3 className="input-section_itemTitle">
					Importe la serie de la cuenca de comparación
				  </h3>
	  
				  <div
					className="box input-section_itemContainer"
					id="cuencaComparacion"
				  >
					<input
					  name="fileComp"
					  id="fileComp"
					  type={"file"}
					  accept=".csv, .xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
					  className="inputfile inputfile-4"
					/>
					<label htmlFor="fileComp">
					  <figure>
						<img src={loadDataImage} alt="cloud data send" />
					  </figure>
					  <span>Buscar en mi equipo</span>
					</label>
				  </div>
				</div>
	  
			   </div>
	  
			   <div className="input-section_itemShort">
				  <input id="compare" name="compare" type={"checkbox"} 
				  
				  onClick={this.showComparisonBasin} value="false"></input>
				  <label htmlFor="compare">Tengo una cuenca de comparación.</label>
			   </div>
	  
				<fieldset className="compare-input">
				  <div className="compare-input__container">
				  <label className="compare-input__title">Area cuenca base</label>
					<input className="compare-input__input" id="areaBase" type={"number"}></input>
					<select className="compare-input__select" id="unitsBase">
					  <option>m²</option>
					  <option>ha²</option>
					  <option>km²</option>
					  <option>ft²</option>
					  <option>mi²</option>
					</select>
				  </div>
				  <div className="compare-input__container">
				  <label className="compare-input__title">Area cuenca de comparación</label>
					<input className="compare-input__input" id="areaComp" type={"number"}></input>
					<select className="compare-input__select" id="unitsComp">
					  <option>m²</option>
					  <option>ha²</option>
					  <option>km²</option>
					  <option>ft²</option>
					  <option>mi²</option>
					</select>
				  </div>
				    
				    
				</fieldset>
	  
				<PopUpText
				  id="input-error"
				  className={this.state.errorClassList}
				  text={this.state.error}
				/>
				<PopUpText
				  id="input-warn"
				  className={this.state.warnClassList}
				  text={this.state.warn}
				/>
				<div className="btn-submit_container">
				  <button className="btn-submit_btn" type="button" onClick={this.calcule}>
					Calcular
				  </button>
				</div>
			    
			  </form>
			</section>
	  
			<section>
			  <div className={this.state.outputClassList}>
				<h2>Resultados</h2>
				<img
				  className="img-full" src="http://localhost:3000/mock_graph.png" alt="resultados analisis"
				/>
			  </div>
			</section>
		  </>*/
		);
	}

	// showComparisonBasin() {
	//   const checkbox = document.getElementById("compare");
	//   const box = document.getElementById("BasinComp");

	//   checkbox.addEventListener("click", function handleClick() {
	//     if (checkbox.checked) {
	//       // this.setbasinComparison(true);
	//       box.style.display = "grid";
	//     } else {
	//       box.style.display = "none";
	//     }
	//   });
	// }

	setWarn(msg) {
		// Cuando el estado de warning haya cambiado se ejecuta
		this.setState({ warn: msg });
		const warn = document.getElementById("input-warn");
		const arrayAux = this.state.warnClassList.split(", ");
		const index = arrayAux.indexOf("closed");

		if (warn && msg) {
			if (index !== -1) {
				arrayAux.splice(index, 1);
			}
		} else {
			if (index === -1) {
				arrayAux.push("closed");
			}
		}
		this.setState({ warnClassList: arrayAux.join(" ") });
	}

	setError(msg) {
		// Cuando el estado de error haya cambiado se ejecuta esto
		this.setState({ error: msg });
		const error = document.getElementById("input-error");
		const arrayAux = this.state.errorClassList.split(" ");
		const index = arrayAux.indexOf("closed");

		if (error && msg) {
			if (index !== -1) {
				arrayAux.splice(index, 1);
			}
		} else {
			if (index === -1) {
				arrayAux.push("closed");
			}
		}
		this.setState({ errorClassList: arrayAux.join(" ") });
	}

	validateCsv(file) {
		const validFileTypes = [
			"csv",
			"xslx",
			"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		];
		// Revisa que se haya subido un archivo
		console.log("Validando formato de archivo", file);
		if (!file) {
			this.setError("No se ha subido ningun archivo");
			alert("ERROR: No se ha subido ningun archivo");
			console.log("ERROR: No se ha subido ningun archivo");
			return false;
		}

		// Revisa que el archivo sea csv
		const extension = file.type ? file.type : file.name.split(".").pop();
		console.log(extension)
		if (validFileTypes.indexOf(extension) === -1) {
			console.log("ERROR: El archivo no es un csv");
			return true;
		}

		// Revisa encabezado

		// Llama a API para com´probar años

		// Si se retorna false deberia saltar un error.
		let x = document.getElementsByClassName("input-section_itemContainer")
		x.classList.add("active");
		return true;
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
			return false;
		}

		// Revisar que las areas sean mayores a cero.
		if (positive && num < 0) {
			// this.setError('El area no es un número valido');
			console.log("ERROR: El area ingresada es menor a cero");
			return false;
		}

		return true;
	}

	validateDimensions(area) {
		console.log("Validando dimensiones");
		const min = 25;
		const max = 8000000;

		// Pasa un warning si el area es menor a 25 km2
		if (area < min) {
			this.setWarn("Estás trabajando con una microcuenca.");
			console.log("WARN: Estás trabajando con una microcuenca");
			return false;
		} else if (area > max) {
			// this.setWarn( 'El area ingresada es mayor al area de la cuenca del Amazonas.' );
			console.log(
				"WARN: El area ingresada es mayor al area de la cuenca del Amazonas"
			);
			return false;
		}

		return true;
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

	calcule() {
		// Recoge datos y los valida

		const cuencaBase = {
			csv: document.getElementById("fileBase").files[0],
		};

		const cuencaAux = {};

		if (!this.validateCsv(cuencaBase.csv)) {
			this.disableOutput();
			return [];
		}

		const compare = document.getElementById("compare").checked;

		if (compare) {
			// if(this.state.compare) {

			const areaBase = document.getElementById("areaBase").value;
			const unitsBase = document.getElementById("unitsBase").value;

			if (this.validateNum(parseFloat(areaBase))) {
				cuencaBase.area = this.areaToKm2(areaBase, unitsBase);
			} else {
				this.disableOutput();
				return [];
			}

			const areaComp = document.getElementById("areaComp").value;
			const unitsComp = document.getElementById("unitsComp").value;

			if (this.validateNum(parseFloat(areaComp))) {
				cuencaAux.csv = document.getElementById("fileComp").files[0];
				cuencaAux.area = this.areaToKm2(areaComp, unitsComp);
			} else {
				this.disableOutput();
				return [];
			}

			if (!this.validateCsv(cuencaAux.csv)) {
				this.disableOutput();
				return [];
			}
		}

		// Llama a API.
		/*
			El llamado a API deberia enviar los siguientes parametros:
			( { csv, area }, compare = false, { csv, area } = {} )
			y recibiria un arreglo de porcentajes de aprovechamiento
			*/

		this.enableOutput();
	}
}
