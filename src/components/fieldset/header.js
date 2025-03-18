import React from "react";
import PropTypes from "prop-types";
import "./styles.css";

FieldsetHeader.propTypes = {
    id: PropTypes.string,
    title: (PropTypes.string = ""),

    required: PropTypes.bool,
    active: PropTypes.bool,
    onChange: PropTypes.func,

    children: PropTypes.string,
};

export function FieldsetHeader(props) {
    /* El header de un fieldset tiene titulo, leyenda, estado */
    return (
        <div className={`fs-header${props.active ? "" : " inactive"}`}>
            <legend>{props.children}</legend>
            {props.required ? (
                <></>
            ) : (
                <p>
                    <input
                        id={`active-fs-${props.id}`}
                        name={`active-fs-${props.id}`}
                        type="checkbox"
                        checked={props.active}
                        onChange={(e) => props.onChange(e.target.checked)}
                    />
                    <label htmlFor={`check-show-fieldset-${props.id}`}>
                        Activar
                    </label>
                </p>
            )}
        </div>
    );
}
