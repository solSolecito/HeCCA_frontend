import React, { useState } from 'react';
import './styles.css';
import { processDataService } from '../../services/processDataService.js';
import { Input } from '../input/Input';
import { Output } from '../output/Output';

export function Main() {

    const [outputdisplay, setOutputdisplay] = useState('none');
    const [mapLat, setmapLat] = useState(4);
    const [mapLng, setmapLng] = useState(-73);

    const setMapCoords = (coords) => {
        console.log(coords)
        setmapLat(coords.lat);
        setmapLng(coords.lon)
    }

    const calcule = (e) => {

        // Recoge datos y los valida
        e.preventDefault();

        const cuencaBase = {
            csv: document.getElementById("inp-file").files[0],
        };

        const cuencaAlt = {};

        const validationBase = validateCsv(cuencaBase.csv);
        setMsg("msg-fs-file", validationBase.msg);

        if (!validationBase.valid) {
            return [];
        }

        const compare = document.getElementById("inp-checker-alt").checked;

        // if(state.compare) {
        if (compare) {

            //Validación de csv
            cuencaAlt.csv = document.getElementById("inp-file-alt").files[0];

            const validationAlt = validateCsv(cuencaAlt.csv);
            setMsg('msg-fs-file-alt', validationAlt.msg);

            if (!validationBase.valid) {
                return [];
            }

            const areaBase = document.getElementById("inp-area").value;
            const areaAlt = document.getElementById("inp-area-alt").value;

            const validationAreas = [validateNum(parseFloat(areaBase)), validateNum(parseFloat(areaAlt))];
            setMsg('msg-fs-areas', validationAreas[0].valid ? validationAreas[1].msg : validationAreas[0].msg);

            if (validationAreas.find(a => !a.valid)) {
                return [];
            }

            const unitsBase = document.getElementById("inp-units").value;
            const unitsAlt = document.getElementById("inp-units-alt").value;
            cuencaBase.area = areaToKm2(areaBase, unitsBase);
            cuencaAlt.area = areaToKm2(areaAlt, unitsAlt);

            const validationDims = [validateDimensions(cuencaBase.area), validateDimensions(cuencaAlt.area)];
            setMsg('msg-fs-areas', validationDims[0].valid ? validationDims[1].msg : validationDims[0].msg);
        }

        console.log('Calculando')

        // Llama a API.
        /*
            El llamado a API deberia enviar los siguientes parametros:
            ( { csv, area }, compare = false, { csv, area } = {} )
            y recibiria un arreglo de porcentajes de aprovechamiento
            */

        setMapCoords( processDataService(cuencaBase.csv).coords );
    }

    return (
        <main>
            <Input></Input>
            <section>
                <div display={outputdisplay}>
                    <img className="img-full" id="map-location" src='../../images/mock_graph.png' alt="" />
                </div>
                <div display={outputdisplay}>
                    <img className="img-full" id="img-series" src='../../images/mock_graph.png' alt="" />
                </div>
                <div display={outputdisplay}>
                    <img className="img-full" id="img-umbrales" src='../../images/mock_graph.png' alt="" />
                </div>
            </section>
        </main>
    )
/* <section className="input">
                <h2>Carga de Datos</h2>
                <form>

                    <fieldset title="Serie Cuenca Base">
                        <legend>Inserte Serie de la Cuenca Base</legend>
                        <p>
                            <label htmlFor="inp-file"> Buscar en mi equipo </label>
                            <input
                                id="inp-file"
                                name="inp-file"
                                type={'file'} accept=".csv, .xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                alt="Seleccionar serie de datos"
                                placeholder="No se han seleccionado archivos"
                                required
                            />
                        </p>

                        <p className="message invisible" id="msg-fs-file"></p>
                    </fieldset>
                    <fieldset>
                        <legend>Rellenado de datos</legend>
                        <p>
                            <input id="inp-checker-alt" name="inp-checker-alt" type="checkbox" onChange={setVisFileAlt} />
                            <label htmlFor="inp-checker-alt">Tengo una cuenca de comparación</label>
                        </p>
                    </fieldset>
                    <fieldset id="fs-file-alt" title="Serie Cuenca Alt" className="invisible">
                        <legend>Inserte Serie de la Cuenca de Comparación</legend>
                        <p>
                            <label htmlFor="inp-file-alt"> Buscar en mi equipo </label>
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
                                <label htmlFor="inp-area">Area Cuenca Base</label>
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
                                <label htmlFor="inp-area-alt">Area Cuenca de Comparación</label>
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
                    <fieldset>
                        <legend>Umbrales Morfometricos</legend>
                        <p>
                            <input id="inp-checker-q" name="inp-checker-q" type="checkbox" onChange={setVisFileQ} />
                            <label htmlFor="inp-checker-q">Tengo un modelo hidraulico de mi cuenca base</label>
                        </p>
                    </fieldset>

                    <fieldset id="fs-q" title="Umbrales Morfometricos" className='invisible'>
                        <legend></legend>
                        <div className='cont-q'>
                            <label htmlFor="inp-qb">
                                <span>Qb</span>
                                <input className="compare-input__input" id="inp-qb" name="inp-qb" type={"number"}></input>
                                <span>años</span>
                            </label>
                        </div>
                        <div className='cont-q'>
                            <label htmlFor="inp-qtq">
                                <span>Qtq</span>
                                <input className="compare-input__input" id="inp-qtq" name="inp-qtq" type={"number"}></input>
                                <span>años</span>
                            </label>

                        </div>
                    </fieldset>

                    <div className='container-btns'>
                        <button className='btn btn-main' onClick={calcule}>Calcular</button>
                    </div>
                </form>
            </section> */
}

function setVisibility(id, visible) {
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

function setMsg(id, msg) {
    const msgDiv = document.getElementById(id);
    try {
        if (msg === "") {
            setVisibility(id, false);
        } else {
            msgDiv.innerHTML = msg;
            setVisibility(id, true);
        }
    } catch (error) {
        console.log(error);
    }
}

function setVisFileAlt(e) {
    const checked = e.target.checked;
    setVisibility('fs-file-alt', checked)
    setVisibility('fs-areas', checked)
}

function setVisFileQ(e) {
    const checked = e.target.checked;
    setVisibility('fs-q', checked)
}

function validateCsv(file) {

    const validFileTypes = [
        "csv",
        "text/csv",
        "xslx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    // Revisa que se haya subido un archivo

    if (!file) {
        console.log("ERROR: No se ha subido ningun archivo");
        return {
            valid: false,
            msg: 'ERROR: No se ha subido ningun archivo'
        };
    }

    // Revisa que el archivo sea csv

    console.log("Validando formato de archivo de ", file.name);

    const extension = file.type ? file.type : file.name.split(".").pop();
    console.log(extension)
    if (validFileTypes.indexOf(extension) === -1) {
        console.log("ERROR: El archivo no es un csv");
        return {
            valid: false,
            msg: 'ERROR: El archivo no es un csv'
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

function areaToKm2(area, units) {
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
    validateDimensions(areakm2);
    return areakm2;
}

function validateNum(num, positive = true) {
    console.log("Validando valores de area");

    // Revisar que las areas sean números.
    if (isNaN(num * 1)) {
        // setError( 'El area no es un número valido' );
        console.log("ERROR: El area ingresada no es un número");
        return {
            valid: false,
            msg: 'ERROR: El area ingresada no es un número'
        };
    }

    // Revisar que las areas sean mayores a cero.
    if (positive && num < 0) {
        // setError('El area no es un número valido');
        console.log("ERROR: El area ingresada es menor a cero");
        return {
            valid: false,
            msg: 'ERROR: El area ingresada es menor a cero'
        };
    }
    return {
        valid: true,
        msg: ''
    };
}

function validateDimensions(area) {
    console.log("Validando dimensiones");
    const min = 25;
    const max = 8000000;

    // Pasa un warning si el area es menor a 25 km2
    if (area < min) {
        console.log("WARN: Estás trabajando con una microcuenca");
        return {
            valid: false,
            msg: 'ADVERTENCIA: Estás trabajando con una microcuenca'
        };
    } else if (area > max) {
        // setWarn( 'El area ingresada es mayor al area de la cuenca del Amazonas.' );
        console.log(
            "WARN: El area ingresada es mayor al area de la cuenca del Amazonas"
        );
        return {
            valid: false,
            msg: 'ADVERTENCIA: El area ingresada es mayor al area de la cuenca del Amazonas'
        };
    }
    return {
        valid: true,
        msg: ''
    };
}
