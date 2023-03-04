import React from 'react';
import { PopUpText } from './PopUpText';

export class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: props.file ? props.file : 'No se han seleccionado archivos',
            error: props.error ? props.error : '',
            errorClassList: props.errorClassList ? props.errorClassList : 'window closed',
            warn: props.warn ? props.warn : '',
            warnClassList: props.warnClassList ? props.warnClassList : 'window closed',
            outputClassList:  props.outputClassList ? props.outputClassList : 'mock invisible',
        }
        this.calcule = this.calcule.bind(this);
        //this.setWarn = this.setWarn.bind(this);
        //this.setError = this.setError.bind(this);
    }

    /* <p><button>Buscar en Drive</button></p>
    <p>{this.state.file}</p> */

    render() {
        return (
            <>
                <section>
                    <form>
                        <fieldset>
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

                        </fieldset>
                        <fieldset className="compare-input">
                            <p>
                                <label>Area cuenca base</label>
                                <input id="areaBase" type={'number'}></input>
                                <select id="unitsBase">
                                    <option>m²</option>
                                    <option>ha²</option>
                                    <option>km²</option>
                                    <option>ft²</option>
                                    <option>mi²</option>
                                </select>
                            </p>
                            <p>
                                <label>Area cuenca de comparación</label>
                                <input id="areaComp" type={'number'}></input>
                                <select id="unitsComp">
                                    <option>m²</option>
                                    <option>ha²</option>
                                    <option>km²</option>
                                    <option>ft²</option>
                                    <option>mi²</option>
                                </select>
                            </p>
                        </fieldset>
                        <PopUpText id="input-error" className={this.state.errorClassList} text={this.state.error} />
                        <PopUpText id="input-warn" className={this.state.warnClassList} text={this.state.warn} />
                        <button type="button" onClick={this.calcule}>Calcular</button>
                    </form>
                </section>

                <section>
                    <div className={this.state.outputClassList}>
                        <h2>Resultados</h2>
                        <img class="img-full" src="http://localhost:3000/mock_graph.png" />
                    </div>
                </section>
            </>



        )
    }

    setWarn(msg) {
        // Cuando el estado de warning haya cambiado se ejecuta 
        this.setState({ warn: msg });
        const warn = document.getElementById('input-warn');
        const arrayAux = this.state.warnClassList.split(', ');
        const index = arrayAux.indexOf('closed');

        if (warn && msg) {
            if (index != -1) {
                arrayAux.splice(index, 1);
            }
        } else {
            if (index == -1) {
                arrayAux.push('closed');
            }
        }
        this.setState({ warnClassList: arrayAux.join(' ') })
    }

    setError(msg) {
        // Cuando el estado de error haya cambiado se ejecuta esto
        this.setState({ error: msg });
        const error = document.getElementById('input-error');
        const arrayAux = this.state.errorClassList.split(' ');
        const index = arrayAux.indexOf('closed');

        if (error && msg) {
            if (index !== -1) {
                arrayAux.splice(index, 1);
            }
        } else {
            if (index === -1) {
                arrayAux.push('closed');
            }
        }
        this.setState({ errorClassList: arrayAux.join(' ') })
    }

    validateCsv(file) {

        const validFileTypes = [
            "csv", "xslx",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ]
        // Revisa que se haya subido un archivo
        console.log('Validando formato de archivo', file)
        if (!file) {
            this.setError('No se ha subido ningun archivo');
            console.log("ERROR: No se ha subido ningun archivo")
            return false
        }

        // Revisa que el archivo sea csv
        const extension = file.type ? file.type : file.name.split(".").pop();
        if (validFileTypes.indexOf(extension) === -1) {
            console.log("ERROR: El archivo no es un csv")
            return false
        }

        // Revisa encabezado

        // Llama a API para com´probar años

        // Si se retorna false deberia saltar un error.

        return true;
    }

    areaToKm2(area, units) {
        let areakm2;
        switch (units) {
            case "km":
                areakm2 = area;
            case "m":
                areakm2 = area / (1000000);
            case "ha":
                areakm2 = area / (10000);
            default:
                areakm2 = area;
        }
        this.validateDimensions(areakm2);
        return areakm2
    }

    validateNum(num, positive = true) {
        console.log('Validando valores de area')

        // Revisar que las areas sean números.
        if (isNaN(num * 1)) {
            // this.setError( 'El area no es un número valido' );
            console.log('ERROR: El area ingresada no es un número');
            return false;
        }

        // Revisar que las areas sean mayores a cero.
        if (positive && num < 0) {
            // this.setError('El area no es un número valido');
            console.log('ERROR: El area ingresada es menor a cero');
            return false;
        }

        return true;
    }

    validateDimensions(area) {

        console.log('Validando dimensiones');
        const min = 25;
        const max = 8000000;

        // Pasa un warning si el area es menor a 25 km2
        if (area < min) {
            this.setWarn('Estás trabajando con una microcuenca.');
            console.log('WARN: Estás trabajando con una microcuenca');
            return false;
        } else if (area > max) {
            // this.setWarn( 'El area ingresada es mayor al area de la cuenca del Amazonas.' );
            console.log('WARN: El area ingresada es mayor al area de la cuenca del Amazonas');
            return false;
        }

        return true;
    }

    enableOutput () {
        const arrayAux = this.state.outputClassList.split(' ');
        const index = arrayAux.indexOf('invisible');
        if (index !== -1) {
            arrayAux.splice(index, 1)
            this.setState({ outputClassList: arrayAux.join(' ') })
        }
    }

    disableOutput () {
        const arrayAux = this.state.outputClassList.split(' ');
        const index = arrayAux.indexOf('invisible');
        if (index === -1) {
            arrayAux.push('invisible')
            this.setState({ outputClassList: arrayAux.join(' ') })
        }
    }

    calcule() {

        // Recoge datos y los valida

        const cuencaBase = {
            csv: document.getElementById('fileBase').files[0],
        };

        const cuencaAux = {};

        if (!this.validateCsv(cuencaBase.csv)) {
            this.disableOutput();
            return [];
        }

        const compare = document.getElementById('compare').checked;

        if (compare) {
            // if(this.state.compare) {

            const areaBase = document.getElementById('areaBase').value;
            const unitsBase = document.getElementById('unitsBase').value;

            if (this.validateNum(parseFloat(areaBase))) {
                cuencaBase.area = this.areaToKm2(areaBase, unitsBase);
            } else {
                this.disableOutput();
                return []
            }

            const areaComp = document.getElementById('areaComp').value;
            const unitsComp = document.getElementById('unitsComp').value;

            if (this.validateNum(parseFloat(areaComp))) {
                cuencaAux.csv = document.getElementById('fileComp').files[0];
                cuencaAux.area = this.areaToKm2(areaComp, unitsComp);
            } else {
                this.disableOutput();
                return []
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