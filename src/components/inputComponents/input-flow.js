import React, { useState } from "react";
import PropTypes from "prop-types";
import * as validate from "../../utils/validations";
import * as units from "../../utils/units";
import "./styles.css";

export function InputFlow(props) {
    const [value, setValue] = useState(0);
    const [unit, setUnit] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [errVisibility, setErrVisibility] = useState(false);

    function changeSomething() {
        const validation = validate.unit(value, units.area);
        if (validation.valid) {
            props.onChange(preprocessQ(value, unit));
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
        <div>
            <label htmlFor={props.id}>{props.label}</label>
            <div  className="input-wrapper">
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
                        {units.flow.map((op, i) => {
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

function preprocessQ(value, unit) {
    const val = validate.number(value);
    const m3s = units.flow.find((un) => un.value === unit).toM3s(value);
    return {
        data: m3s,
        valid: val.valid,
    };
}

InputFlow.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
};
