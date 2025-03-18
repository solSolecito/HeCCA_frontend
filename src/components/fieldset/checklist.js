import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

export function FieldsetChecklist(props) {
    const checkedList = props.optionsList.map( option => option.checked );
    let errMsg = '';

    const validate = () => {
        for (let i = 0; i < props.optionsList.length; i++) {
            if ( props.optionsList[i].required && !checkedList[i] ) {
                errMsg = "La opción " + props.optionsList[i].label + " debe estar seleccionada";
                return false;
            }
        }
        if ( props.minCheck > checkedList.filter( c => c === true ).length ) {
            errMsg =  `Seleccione al menos ${ props.minCheck } ${ props.minCheck === 1 ? 'opción' : 'opciones'}.`;
            return false;
        }
        return true;
    }

    validate()

    return (
        <div>
            {props.optionsList.map((option, i) => {
                return (
                    <p key={`${props.id}-${option.id}`}>
                        <input
                            id={`${props.id}-${option.id}`}
                            name={`${props.id}-${option.id}`}
                            type="checkbox"
                            checked={option.checked}
                            onChange={(e) => {
                                checkedList[i] = e.target.checked;
                                props.onChange( { 
                                    valid: validate(),
                                    active: checkedList
                                } );
                                
                            }}
                        />
                        <label htmlFor={`${props.id}-${option.id}`}>{option.label} </label>
                        
                    </p>
                );
            })}
            <p className={ errMsg ? "msg-err" : "invisible" }
                id={`msg-${props.id}`}
            >
                { errMsg }
            </p>
        </div>
    );
}

FieldsetChecklist.propTypes = {
    id: PropTypes.string.isRequired,
    required: PropTypes.bool = false,
    active: PropTypes.bool = false,
    optionsList: PropTypes.array = [],
    minCheck: PropTypes.number = 0,
    onChange: PropTypes.func = ( ) => {},
};
