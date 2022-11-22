import React from 'react';

export class Input extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            file: props.file ? props.file : 'No se han seleccionado archivos',
            error:  props.error ? props.error : '',
        }
    }

    /* <p><button>Buscar en Drive</button></p>
    <p>{this.state.file}</p> */

    render() {
        return (
            <section>
                <form>
                    <fieldset>
                        <label>Importe la serie de la cuenca base</label>
                        <p>
                            <label>Buscar en mi equipo</label>
                            <input type={'file'}></input>
                        </p>

                    </fieldset>
                    <fieldset>
                        <input type={'checkbox'}></input>
                        <label>Tengo una cuenca de comparación.</label>
                    </fieldset>
                    <fieldset>
                        <label>Importe la serie de la cuenca de comparación</label>
                        <p>
                            <label>Buscar en mi equipo</label>
                            <input type={'file'}></input>
                        </p>

                    </fieldset>
                    <fieldset>
                        <p>
                            <label>Area cuenca base</label>
                            <input type={'number'}></input>
                            <select>
                                <option>m²</option>
                                <option>ha²</option>
                                <option>km²</option>
                                <option>ft²</option>
                                <option>mi²</option>
                            </select>
                        </p>
                        <p>
                            <label>Area cuenca base</label>
                            <input type={'number'}></input>
                            <select>
                                <option>m²</option>
                                <option>ha²</option>
                                <option>km²</option>
                                <option>ft²</option>
                                <option>mi²</option>
                            </select>
                        </p>
                    </fieldset>
                    <div id={'input-error'}></div>
                    <div id={'input-warn'}></div>
                    <button>Calcular</button>
                </form>
            </section>
        )
    }

    setWarn () {
        // Cuando el estado de warning haya cambiado se ejecuta esto
        const warn = document.getElementById('input-warn');
        if( warn ) {
            if( this.state.warning ) {
                warn.removeClassName('closed');
                warn.innerHTML = this.state.warning;
            }
            else {
                warn.addClassName('closed');
            }
        } else { 
            console.log('Hay un error con el formulario')
        }
    }

    setError () {
        // Cuando el estado de error haya cambiado se ejecuta esto
        const error = document.getElementById('input-error');
        if( error ) {
            if( this.state.error ) {
                error.removeClassName('closed');
                error.innerHTML = this.state.error;
            }
            else {
                error.addClassName('closed');
            }
        } else { 
            console.log('Hay un error con el formulario')
        }
    }

    comprobeCsv () {
        // Revisar que sea csv y tenga el formato corecto
        // Si el formato no es csv, retorna un error
        // Si el encabezado no es el correcto, retorna un error

        // Llama a API para comprobar años. Retorna el error que corresponda
    }

    comprobeNum (num) {
        // Revisar que las areas sean números mayores a cero.

    }

    comprobeDimensions () {
        // Pasa un warning si el area es menor a 25 km2
        /*
        if (area < 25km2 ) {
            warning Estás trabajando con una microcuenca.
        } else if ( area < 8000000km2 ) {
            warning. El area ingresada es mayor al area de la cuenca del Amazonas.
        }
        */
        // 
    }

    calcule () {
        // Recoge datos 

        const cuencaBase = {
            csv: 'archivo',
        };

        const cuencaAux = {}

        if(this.state.compare) {
            cuencaAux.csv = 'csv';
            cuencaAux.area = 'csv';
        }

        // Valida Csv
        // Valida números

        // Valida dimensiones

        // Llama a API
    }
}