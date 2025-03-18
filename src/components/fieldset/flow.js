import React, { useState } from "react";
import PropTypes from "prop-types";

import { InputFileCsv } from "../inputComponents/input-file-csv";
import { InputArea } from "../inputComponents/input-area";

export function FieldsetFlow(props) {
    /* El contenido de un fieldset de tipo flow tiene además las series base y relative */
    const [serieBase, setSerieBase] = useState({ valid: false, data: {} });
    const [useRel, setUseRel] = useState(false);
    const [serieRel, setSerieRel] = useState({ valid: false, data: {} });
    const [areaBase, setAreaBase] = useState({ valid: false, data: NaN });
    const [areaRel, setAreaRel] = useState({ valid: false, data: NaN });

    const update = () => {
        let serie2pass = serieBase;
        if (
            useRel &&
            serieBase.valid &&
            serieRel.valid &&
            areaBase.valid &&
            areaRel.valid
        ) {
            console.log("PENDIENTE: Crear función Llenar con comparación");
        }
        return serie2pass;
    };

    return (
        <div>
            <InputFileCsv
                id={`${props.id}-sb`}
                label={props.children}
                required={props.required}
                onChange={ (data) => {
                    serieBase.valid = data.valid;
                    serieBase.data = data.data;
                    setSerieBase( {...serieBase} );
                    props.onChange(update());
                }}
            />
            <p>
                <input
                    id={`${props.id}-active-sr`}
                    name={`${props.id}-active-sr`}
                    type="checkbox"
                    checked={useRel}
                    onChange={(e) => {
                        setUseRel(e.target.checked);
                        props.onChange(update());
                    }}
                />
                <label htmlFor={`${props.id}-active-sr`}>
                    Utilizar serie de otra cuenca para llenar datos faltantes
                </label>
            </p>
            {useRel ? (
                <>
                    <InputFileCsv
                        id={`${props.id}-sr`}
                        label="Serie de Caudales de Comparación"
                        onChange={(data) => {
                            serieRel.valid = data.valid;
                            serieRel.data = data.data;
                            setSerieRel( {...serieRel} );
                            props.onChange(update());
                        }}
                    />
                    <InputArea
                        id={`${props.id}-ab`}
                        label="Area de la Cuenca de Estudio"
                        onChange={(data) => {
                            setAreaBase(data);
                            props.onChange(update());
                        }}
                    />
                    <InputArea
                        id={`${props.id}-ab`}
                        label="Area de la Cuenca de Comparación"
                        onChange={(data) => {
                            setAreaRel(data);
                            props.onChange(update());
                        }}
                    />
                </>
            ) : (
                <></>
            )}
        </div>
    );
}

FieldsetFlow.propTypes = {
    id: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
    children: PropTypes.string,
};
