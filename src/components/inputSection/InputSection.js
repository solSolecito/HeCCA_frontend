import React, { useState } from "react";
import { Fieldset } from "../fieldset";
import "./styles.css";

const methods = [
    {
        id: "ideam",
        label: "IDEAM - MADS",
        req: ["QMedDiario"],
        opt: ["QMinDiario"],
    },
    {
        id: "anla",
        label: "ANLA - MADS",
        req: ["QMedDiario", "QMaxDiario", "QMinDiario"],
        opt: [],
    },
];

const modulos = {
    QMedDiario: {
        type: "flow",
        title: "Caudales Medios Diarios",
        legend: "Caudales Medios Diarios",
    },
    QMinDiario: {
        type: "flow",
        title: "Caudales Mínimos Diarios",
        legend: "Caudales Mínimos Diarios",
    },
    QMaxDiario: {
        type: "flow",
        title: "Caudales Máximos Diarios",
        legend: "Caudales Máximos Diarios",
    },
};

export function InputSection() {
    const [reqMethods, setReqMethods] = useState(
        methods.map((m) => m.id === "ideam")
    );
    const [validationMethods, setValidationMethods] = useState(true);
    const [message, setMessage] = useState("");
    const [inputData, setInputData] = useState([]);

    const reqFS = [];
    const optFS = [];

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

    const updateInputObj = () => {
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

    const checkRequiredFS = () => {
        // Revisa los Fielsets requeridos:
        reqMethods.forEach((met, index) => {
            if (met) {
                methods[index].req.forEach((fsName) => {
                    if (fsName) {
                        if (optFS.includes(fsName)) {
                            optFS.splice(optFS.indexOf(fsName), 1);
                        }
                        if (!reqFS.includes(fsName)) {
                            reqFS.push(fsName);
                        }
                    }
                });
            }
        });
        updateInputObj();
    };

    checkRequiredFS();

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

    return (
        <section className="input">
            <form>
                <Fieldset
                    legend={"Metodologías"}
                    id={"methodologies"}
                    type={"checks"}
                    required={true}
                    optionsList={methodsList}
                    minCheck={1}
                    getData={getCheckData}
                ></Fieldset>

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
                    <div> {message}</div>
                    <button className="btn btn-main" onClick={calcule}>
                        Calcular
                    </button>
                </div>
            </form>
        </section>
    );
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
