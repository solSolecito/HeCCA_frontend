import React, { useState } from "react";
import PropTypes from "prop-types";
import * as validate from "../../utils/validations";
import * as units from "../../utils/units";
import "./styles.css";

export function InputTime(props) {
    const [value, setValue] = useState(0);
    const [unit, setUnit] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [errVisibility, setErrVisibility] = useState(false);

    function changeSomething() {
        const validation = validate.unit(value, units.time);
        if (validation.valid) {
            props.onChange(preprocessTime(value, unit));
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

function preprocessTime(value, unit) {
    const val = validate.number(value);
    const years = units.time.find((un) => un.value === unit).toYear(value);
    return {
        data: years,
        valid: val.valid,
    };
}

InputTime.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
};
