import React, { useState } from "react";
import PropTypes from "prop-types";
import uploadFile from "../../assets/uploadICON.png";
import validateCsv from "../../utils/validateCsv";
import {formatDate} from "../../utils/dateFormat";
import "./styles.css";

const minYears = 15;
const maxMissing = 0.1;

const extendedInfo = ( sheetsData ) => {
    return sheetsData.map( (sheetData, i) => {
        let warn = '';
        let aceptableYears = sheetData.years >= minYears;
        let aceptableMissing = sheetData.missing <= maxMissing;

        if( !aceptableYears ) {
            warn += ` mínimo ${ minYears } años de datos`
        }
        if( !aceptableMissing ) {
            warn += `${warn ? ' y' : '' } máximo ${ maxMissing * 100 }% de datos faltantes`
        }

        return <div 
            key={`sheetInfo-${i}`} 
            className={`msg ${warn ? "msg-warn" : ""}`}
        >
            <p>
                { `${ sheetData.series.length } datos, ${ Math.round ( sheetData.missing * 10000 ) / 100 }% faltantes. Datos desde el ${ formatDate(sheetData.startDate) } hasta el ${ formatDate(sheetData.endDate) } (${ Math.round( sheetData.years * 100 ) / 100 } años).` }
            </p>
            { warn ? <p>
                { 'Se recomienda usar series con' + warn + '. Los resultados podrian no ser fiables.' }
            </p> : <></>}
         </div>
    })
}

export function InputFileCsv( props ) {

    const [filename, setFilename] = useState( "Sin archivos seleccionados" );
    const [ reading, setReading ] = useState( false );
    const [ msg, setMsg ] = useState( "" );

    const [ red, setRed ] = useState( false );
    const [ validSheets, setValidSheets ] = useState( [] );

    async function handleInput( e ) {
        let file = await e.target.files[0];
        let res = await validateCsv( file );
        setReading( false );
        setFilename( res.data.name );
        setMsg( res.msg );
        setRed( !res.valid );
        setValidSheets( res.data.sheets );
        props.onChange( { valid: res.valid, data: res.data.sheets } );
    }

    async function changeInput( e ) {
        setReading( true );
        try {
            handleInput( e );
        } catch ( err ) {
            console.log( err );
            setFilename( "Sin archivos seleccionados" );
            setMsg( "Intente de nuevo" );
        }
    }
    // JSX
    return ( 
        <div className="inp-file">
            <label 
                htmlFor={props.id}
                className="label-file"
            >
                <img
                    className="big-icon"
                    src={uploadFile}
                    alt="Buscar en mi equipo"
                />
                <div>
                    <p> {props.label} </p>
                    <p id="placeholder"> { reading ? "Subiendo Archivo..." : filename }</p>
                </div>    
            </label>
            <input
                id={props.id}
                name={props.id}
                required={props.required}
                onChange= { changeInput }
                type="file"
                accept=".csv, .xslx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                alt = "Buscar en mi equipo"
                placeholder = "Subida de Archivos"
                className="invisible"
            />
            <p
                className={`msg ${red ? "msg-err" : ""}`}
                id={`msg-${props.id}`}
            > { msg } </p>
            { extendedInfo( validSheets )}
        </div>
    );
}

InputFileCsv.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
};
