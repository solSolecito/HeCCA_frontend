import React, { useState } from "react";
import PropTypes from "prop-types";

import { FieldsetHeader } from "./header";
import { FieldsetChecklist } from "./checklist";
import { FieldsetFlow } from "./flow"
import "./styles.css";

export function Fieldset( props ) {
    const [ active, setActive ] = useState( props.required );
    const legend = props.legend ? props.legend : props.title;
    let content = <></>;

    if (active) {

        switch (props.type) {
            
            case "flow":
                content = (
                    <FieldsetFlow
                        id={props.id}
                        required={props.required}
                        onChange={ (data) => {
                            console.log(data);
                            props.getData(data)}
                        }
                    >
                        Serie de {legend}
                    </FieldsetFlow>
                );
                break;
            case "checks":
                content = (
                    <FieldsetChecklist
                        id={ props.id }
                        active={active}
                        required={props.required}
                        onChange = { ( data ) => { 
                            props.getData( data ) 
                        } }
                        optionsList={ props.optionsList ? props.optionsList : []}
                        minCheck={ props.minCheck | 0 }
                    />
                );
                break;
            default:
                break;
        }
    }

    // 12 filas: 3 enso ideam - 3 enso anla

    return (
        <fieldset title = { props.title }>
            <FieldsetHeader
                id={props.id}
                title={props.title}
                required={props.required}
                active={active}
                onChange = {(a) => setActive(a)}
            >
                {legend}
            </FieldsetHeader>
            {content}
        </fieldset>
    );
}

Fieldset.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    legend: PropTypes.string,

    active: PropTypes.bool,
    required: PropTypes.bool,
    type: PropTypes.string,
    getData: PropTypes.func,

    optionsList: PropTypes.array,
    minCheck: PropTypes.number,
};

/* ANT:
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import './styles.css';

export function Fieldset ( props ) {
    // Un fieldset tiene un titulo y una leyenda. Puede o no activarse con un check
    const [cnState, setcnState] = useState( (props.checked || !props.check) ? 1 : 0);

    const contentClassNames = [
        'invisible',
        'fieldset-content'
    ]

    const headerClassNames = [
        'fs-header inactive-header',
        'fs-header active-header'
    ]

    return (
        <fieldset title={props.title}>
            <div className={headerClassNames[cnState]}>
            <legend>{props.legend}</legend>
            {
                props.check === true ?
                    <p>
                        <input
                            id={`check-show-fieldset-${props.id}`}
                            name={`check-show-fieldset-${props.id}`}
                            type="checkbox"
                            ononChange={(e) => setcnState(e.target.checked ? 1 : 0)}
                        />
                        <label htmlFor={`check-show-fieldset-${props.id}`}>
                            {props.checkLabel}
                        </label>
                    </p>
                    :
                    <></>
            }
            </div>
            <div className={contentClassNames[cnState]}>
                {props.children}
            </div>
        </fieldset>
    );
}

Fieldset.propTypes = {
    title: PropTypes.string,
    legend: PropTypes.string,
    check: PropTypes.bool,
    checklabel: PropTypes.string,
    id: PropTypes.string,
    checked: PropTypes.bool | null,
    checkLabel: PropTypes.string | null,
}
*/