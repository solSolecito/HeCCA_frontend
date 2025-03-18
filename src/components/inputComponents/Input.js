import React  from "react";
import PropTypes from "prop-types";
import { InputArea } from "./input-area";
import { InputFlow } from "./input-flow";
import { InputFileCsv } from "./input-file-csv";
import { InputTime } from "./input-time";
import "./styles.css";

export function Input(props) {
    // Types: csv, area, time, flow
    let inputElement = <></>;
    switch (props.type) {
        case "csv":
            inputElement = <InputFileCsv {...props} />;
            break;
        case "area":
            inputElement = <InputArea {...props} />;
            break;
        case "time":
            inputElement = <InputTime {...props} />;
            break;
        case "flow":
            inputElement = <InputFlow {...props} />;
            break;
        default:
            inputElement = (
                <div>
                    <label htmlFor={props.id}>{props.label}</label>
                    <input id={props.id} name={props.id} />
                </div>
            );
            break;
    }

    return inputElement;
}

Input.propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
};
