import React from 'react';
import { PopUpText } from './PopUpText';

export class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: props.file ? props.file : 'No se han seleccionado archivos',
            error:  props.error ? props.error : '',
            errorClassList:  props.errorClassList ? props.errorClassList : 'window closed',
            warn: props.warn ? props.warn : '',
            warnClassList:  props.warnClassList ? props.warnClassList : 'window closed',
            outputClassList:  props.outputClassList ? props.outputClassList : 'mock invisible',
        }
        this.calcule = this.calcule.bind(this);
        this.setWarn = this.setWarn.bind(this);
        this.setError = this.setError.bind(this);
    }
    /* <p><button>Buscar en Drive</button></p>
    <p>{this.state.file}</p> */

    render() {
        return (
            <main>

                <section>
                    <form>
                        <fieldset>
                            <label>Importe la serie de la cuenca base</label>
                            <p>
                                <label>Buscar en mi equipo</label>
                                <input id="fileBase" type={'file'}></input>
                            </p>

                        </fieldset>
                        <fieldset>
                            <input id="compare" type={'checkbox'}></input>
                            <label>Tengo una cuenca de comparación.</label>
                        </fieldset>
                        <fieldset>
                            <label>Importe la serie de la cuenca de comparación</label>
                            <p>
                                <label>Buscar en mi equipo</label>
                                <input  id="fileComp" type={'file'}></input>
                            </p>

                        </fieldset>
                        <fieldset>
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
                        <PopUpText id="input-error" className={this.state.errorClassList} text={this.state.error}/>
                        <PopUpText id="input-warn" className={this.state.warnClassList} text={this.state.warn}/>
                        <button  type="button" onClick={this.calcule}>Calcular</button>
                    </form>
                </section>
                <section>
                    <div className={this.state.outputClassList}>
                        <h2>Resultados</h2>
                        <img class="img-full" src="http://localhost:3000/mock_graph.png"/>
                    </div>
                </section>
            </main>
        )
    }

    setWarn (msg) {
        // Cuando el estado de warning haya cambiado se ejecuta 
        this.setState({warn:msg});
        const warn = document.getElementById('input-warn');
        const arrayAux = this.state.warnClassList.split(', ');
        const index = arrayAux.indexOf('closed');
        
        if( warn && msg ) {
            if(index != -1){
                arrayAux.splice(index, 1);
            }
        } else {
            if(index == -1){
                arrayAux.push('closed');
            }
        }
        this.setState({warnClassList: arrayAux.join(' ')})
    }

    setError (msg) {
        // Cuando el estado de error haya cambiado se ejecuta esto
        this.setState({error:msg});
        const error = document.getElementById('input-error');
        const arrayAux = this.state.errorClassList.split(', ');
        const index = arrayAux.indexOf('closed');
        
        if( error && msg ) {
            if(index != -1){
                arrayAux.splice(index, 1);
            }
        } else { 
            if(index == -1){
                arrayAux.push('closed');
            }
        }
        this.setState({errorClassList: arrayAux.join(' ')})
    }

    comprobeCsv () {
        // Revisar que sea csv y tenga el formato corecto
        // Si el formato no es csv, retorna un error
        // Si el encabezado no es el correcto, retorna un error

        // Llama a API para comprobar años. Retorna el error que corresponda
    }

    comprobeNum (num, positive=true) {
        console.log('comprobando número')
        // Revisar que las areas sean números mayores a cero.
        if(isNaN(num)){
           this.setError('El area no es un número valido');
        }
        if(positive && num<0){
            this.setError('El area no es un número valido');
        }
    }

    areaToKm2(area, units){
        switch(units){
            case "km":
                return area;
            case "m":
                return area*(1000000);
            case "ha":
                return area*(10000);
            default:
                return area;
        }
    }

    comprobeDimensions (area) {
        console.log('Comparación de dimensiones')
        const min = 25;
        const max = 8000000;
        // Pasa un warning si el area es menor a 25 km2
        if (area < min ) {
            this.setWarn('Estás trabajando con una microcuenca.')
        } else if ( area < max ) {
            this.setWarn('El area ingresada es mayor al area de la cuenca del Amazonas.');
        }
    }

    calcule () {

        const arrayAux = this.state.outputClassList.split(' ');
        const index = arrayAux.indexOf('invisible'); 
        if(index !== -1 ){
            arrayAux.splice(index, 1)
            this.setState({outputClassList: arrayAux.join(' ')})
        }

        // Recoge datos 
        const cuencaBase = {
            csv: document.getElementById('fileBase').value,
        };

        const compare = document.getElementById('compare').checked;
        console.log('cuenca base', cuencaBase)
        console.log('comparación', compare)

        if(compare){
        //if(this.state.compare) {
            const areaBase = document.getElementById('areaBase').value;
            const unitsBase = document.getElementById('unitsBase').value;
            
            this.comprobeNum(parseFloat(areaBase));
            cuencaBase.area = this.areaToKm2(areaBase, unitsBase);

            const areaComp = document.getElementById('areaComp').value;
            const unitsComp = document.getElementById('unitsComp').value;
            this.comprobeNum(areaComp);


            const cuencaAux = {
                csv: document.getElementById('fileComp').value,
                area : this.areaToKm2(areaComp, unitsComp),
            }
            console.log(cuencaBase, cuencaAux)
        }

        


        // Valida Csv


        // Valida dimensiones

        // Llama a API
    }

}