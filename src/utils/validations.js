function number(num, positive = true) {
    // Revisar que las areas sean números.
    if (typeof num !== 'number') {
        return {
            valid: false,
            msg: 'El valor ingresado no es un número'
        }
    }

    // Revisar que no sea un NaN o null.
    if (isNaN(num * 1)) {
        return {
            valid: false,
            msg: 'El valor ingresado no es un número válido'
        }
    }

    // Revisar que las areas sean mayores a cero.
    if (positive && num < 0) {
        return {
            valid: false,
            msg: 'Se requiere un valor positivo'
        }
    }

    return {
        valid: true,
        msg: 'Todo en orden'
    }
}

function unit(unit, unitsArray) {
    // Revisar que la unidad seleccionada esté en el arreglo
    const selected = unitsArray.find(un => un.value == unit);
    if (!selected.label && !selected.value) {
        return {
            valid: false,
            msg: 'Seleccione una unidad'
        }
    }
    return {
        valid: true,
        msg: 'Todo en orden'
    }
}


function csv(file) {
    const validFileTypes = [
        "csv",
        "text/csv",
        "xslx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ];

    // Revisa que se haya subido un archivo
    if (!file) {
        return {
            valid: false,
            msg: 'No se ha subido ningún archivo'
        }
    }

    // Revisa que el archivo sea csv
    console.log("Validando formato de archivo de ", file.name);
    const extension = file.type ? file.type : file.name.split(".").pop();
    if (validFileTypes.indexOf(extension) === -1) {
        return {
            valid: false,
            msg: 'El archivo no es de un tipo válido'
        }
    }

    // Revisa encabezado

    // Llama a API para com´probar años

    // Si se retorna false deberia saltar un error.
    return {
        valid: true,
        msg: 'Todo en orden'
    }
}

export { number, unit, csv }