import React, { useState } from "react";
import { Fieldset } from "../fieldset";

import "./styles.css";
import * as rawMethodologies from "./methodologies.json";
import * as rawFieldsets from "./fieldsets.json";
import saveJSON from "../../services/saveJSON";

const defaultMethod = 'ideam';

const obj2Arr  = ( obj ) => {
    const arr = [];
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            if( !isNaN(key) ) {
                arr[key] = obj[key]
            }
        }
    }
    return arr;
}

export function InputSection() {
    const methodologies = obj2Arr(rawMethodologies);
    const fieldsets = obj2Arr(rawFieldsets);

    // Parte 1: Metodologias - - -

    const [reqMethods, setReqMethods] = useState(
        methodologies.map((m) => m.id === defaultMethod)
    );
    const [validationMethods, setValidationMethods] = useState(true);

    const optionsList = methodologies.map((m, index) => {
        return {
            id: m.id,
            label: m.label,
            required: m.id === defaultMethod,
            checked: reqMethods[index],
       };
    });

    const updateMethods = ( { active, valid } ) => {
        setReqMethods(active);
        setValidationMethods(valid);
    }
    
    const fsMethods = < Fieldset
        id = { "methodologies" }
        title = { "Metodologíashasudwi" }
        legend = { "Metodologíaaaaaaaas" }
        active = { true }
        required = { true }
        type = { "checks" }
        getData = { updateMethods }
        optionsList = { optionsList }
        minCheck = { 1 }
    />

    const reqFS = [];
    const optFS = [];

    reqMethods.forEach( (met, ind) => {
        if( met ) {
            methodologies[ind].required.forEach( ( fsName ) => {
                if( !reqFS.includes(fsName) ) {
                    reqFS.push(fsName);
                }
                if( optFS.includes( fsName ) ) {
                    let index = optFS.findIndex((prevFS) => prevFS === fsName);
                    optFS.splice(index, 1)
                }
            })
            methodologies[ind].optional.forEach( ( fsName ) => {
                if( reqFS.includes( fsName ) ) {
                    // NOOP
                } else if( !optFS.includes( fsName ) ) {
                    optFS.push(fsName)
                }
            })
        }
    })

    const [inputData, setInputData] = useState([]);
    const [message, setMessage] = useState("");

    const updateData = (id, {data, valid} ) => {
        const prev = inputData.find( dataSet => dataSet.id === id );
        if (!prev) {
            inputData.push( {
                id,
                data,
                valid
            })
        } else {
            prev.data = data;
            prev.valid = valid;
        }
        setInputData([...inputData]);
    }

    function sendJson() {
        // Validar metodologías
        if ( !validationMethods ) {
            setMessage('Selección de metodologías invalida.')
            return;
        }
        //Validar campos requeridos
        const validationReq = reqFS.map(( fsName ) => {
            const ds = inputData.find( ( dataSet ) => dataSet.id === fsName );
            return ds ? ds.valid : undefined;
        })
        if( validationReq.includes(undefined) ) {
            setMessage('Uno o más de los campos requeridos no han sido completados.');
            return;
        }
        if( validationReq.includes( false ) ) {
            setMessage('Uno o más de los campos requeridos no son válidos.');
            return;
        }

        setMessage('');
        const methods = [];
        reqMethods.forEach( ( met, ind ) => {
            if( met ) {
                methods.push( methodologies[ind].id )
            }
        });
        const config = {
            methods
        }
        const data = inputData.filter(dataSet => dataSet.valid);
        saveJSON( { config, data }, 'test' )
    }

    // Esta sección RECIBE los datos de entrada y los convierte en un JSON.

    // Primera parte del JSON:
    /* "config" : { 
        "reqMethods" : [ array bool],
        "valid": bool,

    } */

    // Segunda parte:
    /* "data" : [ { 
            "id" : string,
            "required": bool,
            "valid": bool,
            "data" : {
        }
    }] */


/*    const updateInputObj = () => {
        inputData.forEach((inputBlock) => {
            if (inputBlock.id) {
                inputBlock.required = reqFS.includes(inputBlock.id);
            }
        });
        reqFS.forEach((fsName) => {
            const existing = inputData.find((input) => input.id === fsName);
            if (!existing) {
                inputData.unshift({
                    id: fsName,
                    required: true,
                    valid: false,
                    data: {},
                });
            }
        });
        optFS.forEach((fsName) => {
            const existing = inputData.find((input) => input.id === fsName);
            if (!existing) {
                inputData.push({
                    id: fsName,
                    required: false,
                    valid: false,
                    data: {},
                });
            }
        });
    };

    const methodsList = methods.map((m, index) => {
        return {
            id: m.id,
            label: m.label,
            required: m.id === "ideam",
            checked: reqMethods[index],
        };
    });

    // Obtiene valores de los checks
    const getCheckData = ({ active, valid }) => {
        setMessage('');
        setReqMethods(active);
        setValidationMethods(valid);
    };

    // Cuando se actualizan los métodos, también se actualiza este objeto.

    const updateData = ({ id, valid, data }) => {
        console.log( 'ud', id, valid, data)
        // actualiza los datos con un id determinado
        const targetIndex = inputData.findIndex((input) => input.id === id);
        if (targetIndex === -1) {
            // Si el objeto no está, entonces lo creo
            inputData.push({ id, valid, data, required: false });
        } else {
            // Si el objeto está, lo actualizo
            inputData[targetIndex].valid = valid;
            inputData[targetIndex].data = data;
        }
        setInputData([...inputData]);
    };

    const generateJSON = () => {
        const jsonObj = {
            config: {
                reqMethods,
                valid: validationMethods,
            },
            data: inputData,
        };

        return JSON.stringify(jsonObj);
    };

    function calcule(e) {
        e.preventDefault();
        // VALIDACIONES
        // - Metodos
        if (!validationMethods) {
            setMessage("Error en metodos");
            return;
        }
        // - Módulos
        console.log(inputData);
        if (inputData.find((id) => id.required && !id.valid)) {
            setMessage("Input invalido");
            return;
        }

        const jsonString = generateJSON();
        console.log(jsonString);
        setMessage("");
        // Petición a API
    }

    
} //208
// 262
// 346

/* const formProps = [
        {
            title: "Serie Cuenca Base",
            legend: "Serie de la Cuenca Base",
            check: false,
            checklabel: "",
            id: "",
            inputs: [
                {
                    id: "base-file",
                    type: "csv",
                    label: "Seleccione el archivo con la serie de Caudales Medios Diarios para la cuenca de estudio",
                    required: true,
                    onChange: (file) => {
                        setBaseFile(file);
                    },
                },
            ],
        },
        {
            title: "Serie Cuenca de Comparación",
            legend: "Cuenca de comparación para rellenar datos faltantes",
            check: true,
            checkLabel: "Tengo una cuenca de comparación",
            id: "serie-alt",
            inputs: [
                {
                    id: "comp-file",
                    type: "csv",
                    label: "Seleccione el archivo con la serie de Caudales Medios Diarios de una cuenca auxiliar",
                    required: false,
                    onChange: (file) => setCompFile(file),
                },
                {
                    id: "base-area",
                    type: "area",
                    label: "Area de la cuenca base",
                    required: false,
                    onChange: (area) => setBaseArea(area.area),
                },
                {
                    id: "comp-area",
                    type: "area",
                    label: "Area de la cuenca de comparación",
                    required: false,
                    onChange: (area) => setCompArea(area.area),
                },
            ],
        },
        {
            title: "Umbrales Morfometricos",
            legend: "Umbrales Morfometricos",
            check: true,
            checkLabel:
                "Tengo series de caudales mínimos y máximos para la cuenca de estudio",
            id: "umbrales",
            inputs: [
                {
                    id: "qmin-file",
                    type: "csv",
                    label: "Seleccione el archivo con la serie de Caudales Mínimos Diarios de la cuenca de estudio",
                    required: false,
                    onChange: (file) => setCompFile(file),
                },
                {
                    id: "qmax-file",
                    type: "csv",
                    label: "Seleccione el archivo con la serie de Caudales Máximos Diarios de la cuenca de estudio",
                    required: false,
                    onChange: (file) => setCompFile(file),
                },
                {
                    id: "qb",
                    type: "time",
                    required: false,
                    label: "Qb",
                    onChange: (q) => setQb(q),
                },
                {
                    id: "qtq",
                    type: "time",
                    required: false,
                    label: "Qtq",
                    onChange: (q) => setQtq(q),
                },
            ],
        },
    ];
    */

    /*return (
        <section className="input">
            <form>
                {inputData.map((input, index) => {
                    const moduleInfo = modulos[input.id];
                    if (moduleInfo) {
                        console.log("INPUTprops", input);
                        return (
                            <Fieldset
                                key={"fs-" + index}
                                getData = { (data) => updateData({ id: input.id, ...data})}
                                {...input}
                                {...moduleInfo}
                            />
                        );
                    } else {
                        return <></>;
                    }
                })}
                <div className="container-btns">
                    
                </div>
            </form>
        </section>
    ); */

    function calcule (e) {
        e.preventDefault();
        sendJson();
        console.log(inputData)
    }

   return (
    <section className="input">
        <form name="input_calc">
            { fsMethods }
            { reqFS.map( (fsId, ind) => {
                const props = fieldsets.find( fs => fs.id === fsId );
                console.log( fsId, props)
                return props ? ( <Fieldset 
                    key = { ind }
                    active = { true }
                    required = { true }
                    getData = { ( getted ) => updateData ( fsId, getted ) }
                    {... props }
                />) : <></>
            }) }
            { optFS.map( (fsId, ind) => {
                const props = fieldsets.find( fs => fs.id === fsId );
                console.log( fsId, props)
                return props ? ( <Fieldset 
                    key = { ind }
                    active = { false }
                    required = { false }
                    getData = { ( getted ) => updateData ( fsId, getted ) }
                    {... props }
                />) : <></>
            }) }
            <fieldset
                id="calc"
                className="buttons"
                title="calcular"
            >
                <div> {message}</div>
                    <button className="btn btn-main" onClick={calcule}>
                        Calcular
                    </button>
            </fieldset>
        </form>
    </section>
   )
}