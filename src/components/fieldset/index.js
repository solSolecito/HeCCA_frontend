import React, { useState } from 'react';
import './styles.css';

export function Fieldset(props) {
    // Un fieldset tiene un titulo y una leyenda. Puede o no activarse con un check
    const [cnState, setcnState] = useState(props.checked ? 0 : 1);

    const contentClassNames = [
        'invisible',
        'fieldset-content'
    ]

    return (
        <fieldset title={props.title}>
            <legend>{props.legend}</legend>
            {
                props.check == true ?
                    <p>
                        <input
                            id={`check-show-fieldset-${props.id}`}
                            name={`check-show-fieldset-${props.id}`}
                            type="checkbox"
                            onChange={(e) => setcnState(e.target.checked ? 1 : 0)}
                        />
                        <label htmlFor={`check-show-fieldset-${props.id}`}>
                            {props.checkLabel}
                        </label>
                    </p>
                    :
                    <></>
            }
            <div className={contentClassNames[cnState]}>
                {props.children}
            </div>
        </fieldset>
    );
    /* <fieldset title="Modelo Hidraulico">
        <legend>Modelo Hidraulico de la Cuenca</legend>
    </fieldset>
    <fieldset title="Tipologias">
        <legend>Tipo de los rios pertenecientes a la cuenca</legend>
    </fieldset>
    <fieldset title="Umbrales Morfometricos">
        <legend>Tipo de los rios pertenecientes a la cuenca</legend>
        <div>
            <label htmlFor="inp-qb">Qb</label>
            <input className="compare-input__input" id="inp-qb" name="inp-qb" type={"number"}></input>
        </div>
        <div>
            <label htmlFor="inp-qtq">Qtq</label>
            <input className="compare-input__input" id="inp-qtq" name="inp-qtq" type={"number"}></input>
        </div>
    </fieldset>
    */
}
