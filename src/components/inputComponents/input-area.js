import React, { useState } from "react";
import PropTypes from "prop-types";
import * as validate from "../../utils/validations";
import * as units from "../../utils/units";
import "./styles.css";

export function InputArea(props) {
    const [value, setValue] = useState(0);
    const [unit, setUnit] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [errVisibility, setErrVisibility] = useState(false);

    function changeSomething() {
        const validation = validate.unit(value, units.area);
        if (validation.valid) {
            props.onChange(preprocessArea(value, unit));
        } else {
            props.onChange({ data: 0, valid: false });
        }
        setErrMsg(validation.msg);
        setErrVisibility(!validation);
    }

    function changeUnit(e) {
        setUnit(e.target.value);
        changeSomething();
    }

    function changeInput(e) {
        setValue(e.target.value);
        changeSomething();
    }

    return (
        <div className="magnitude-input">
            <label htmlFor={props.id}>{props.label}</label>
            <div className="input-wrapper">
                <input
                    id={props.id}
                    name={props.id}
                    type="number"
                    className="dim-input"
                    required={props.required}
                    onChange={changeInput}
                />
                <div className="select-wrapper">
                    <select
                        id={`${props.id}-unit`}
                        name={`${props.id}-unit`}
                        className="dim-select"
                        required={props.required}
                        onChange={changeUnit}
                    >
                        {units.area.map((op, i) => {
                            return (
                                <option value={op.value} key={`op-${i}`}>
                                    {op.label}
                                </option>
                            );
                        })}
                    </select>
                </div>
            </div>
            <p
                className={`message${errVisibility ? "" : " invisible"}`}
                id={`msg-${props.id}`}
            >
                {errMsg}
            </p>
        </div>
    );
}

function validateArea(area) {
    const min = 25;
    const max = 8000000;
    // Pasa un warning si el area es menor a 25 km2
    if (area < min) {
        console.log("WARN: Estás trabajando con una microcuenca");
        return {
            valid: true,
            msg: "Estás trabajando con una microcuenca",
        };
    } else if (area > max) {
        console.log(
            "ERROR: El area ingresada es mayor al area de la cuenca del Amazonas"
        );
        return {
            valid: false,
            msg: "Estás trabajando con un area mayor a la cuenca del Amazonas",
        };
    }
    return {
        valid: true,
        msg: "Todo en orden",
    };
}

function preprocessArea(value, unit) {
    validate.number(value);
    const km2 = units.area.find((un) => un.value === unit).toKm2(value);
    return {
        data: km2,
        valid: validateArea(km2).valid,
    };
}

InputArea.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool = false,
    onChange: PropTypes.func,
};
