import * as XLSX from "xlsx";

const validFileTypes = [
    ["csv", "text/csv"], // CSV
    [
        "xslx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ], //XSLX
];
const validHeaders = [["Fecha"], ["Valor"]];

const getFileTypeIndex = (filetype) =>
    validFileTypes.findIndex((ftl) => ftl.find((ft) => ft === filetype));

const getSeparator = (row0, row1) => {
    const separatorList = [",", ";", " "];
    return separatorList.find(
        (separator) =>
            row0.split(separator).length === row1.split(separator).length
    );
};

function validateHeaders(headersRow, filetype) {
    const findHeaders = (listOfValidHeaders, headersOfThisSheet) => {
        return listOfValidHeaders.find((vh) => {
            if (filetype === 0) {
                return headersOfThisSheet.includes(vh);
            } else {
                return Object.prototype.hasOwnProperty.call(
                    headersOfThisSheet,
                    vh
                );
            }
        });
    };

    let useHeaders = validHeaders.map((validList) =>
        findHeaders(validList, headersRow)
    );

    return useHeaders.includes(undefined) ? [] : useHeaders;
}

const ms2Days = (ms) => Math.round(ms / (24 * 3600 * 1000));
const msToYears = (ms) => ms2Days(ms) / 365.25;

const extractSheetInfo = (rowsData, filetype, h4uIndexs, separator = "") => {
    let startDate;
    let endDate;
    let series;

    // Recorro las filas:
    for (let i = (filetype + 1) % 2; i < rowsData.length; i++) {
        let currDate;
        let currValue;
        switch (filetype) {
            case 0:
                // Para CSV
                // eslint-disable-next-line no-case-declarations
                const rowArray = rowsData[i].split(separator);
                if (rowArray.length < Math.max(...h4uIndexs)) continue;

                currDate = new Date(rowArray[h4uIndexs[0]]);
                currValue = rowArray[h4uIndexs[1]];
                break;

            case 1:
                // Para XSLX
                if (
                    !Object.prototype.hasOwnProperty.call(
                        rowsData[i],
                        h4uIndexs[0]
                    ) ||
                    !Object.prototype.hasOwnProperty.call(
                        rowsData[i],
                        h4uIndexs[1]
                    )
                )
                    continue;

                currDate = new Date(rowsData[i][h4uIndexs[0]]);
                currValue = rowsData[i][h4uIndexs[1]];
                break;

            default:
                return undefined;
        }

        if (!currDate) continue;

        if (!startDate) {
            startDate = currDate;
            endDate = currDate;
            series = [currValue];
            continue;
        }

        let gap = Math.abs(
            ms2Days(currDate - (currDate > endDate ? endDate : startDate))
        );
        let add = new Array(gap).fill(NaN);
        if (currDate < startDate) {
            // Agrego start-curr elementos al inicio
            add[0] = currValue;
            series.unshift(...add);
            startDate = currDate;
        } else if (currDate > endDate) {
            // Agrego curr-end elementos al final
            add[gap - 1] = currValue;
            series.push(...add);
            endDate = currDate;
        } else {
            series[gap] = currValue;
        }
    }

    return {
        startDate,
        endDate,
        series,
        years: msToYears(endDate - startDate),
        missing: series.filter((value) => isNaN(value)).length / series.length,
    };
};

async function readCSV(rawFile, filetype) {
    /* readCSV Lee el archivo en crudo entregado y retorna la siguiente respuesta:
    {
        ntotal: number
        nvalid: number
        validSheets: [
            startDate: Date | null
            endDate: Date | null
            values: []
        ]
    } */

    return new Promise((res, rej) => {
        const info = {
            nSheets: 0,
            nValSheets: 0,
            validSheets: [],
        };
        const reader = new FileReader();
        reader.onload = function (e) {
            const dataResult = e.target.result;

            if (filetype === 0) {
                // Para CSV
                info.nSheets = 1;
                const rowData = dataResult.split("\n");
                if (rowData.length === 1) {
                    rej(info);
                }
                // Obtengo el separador y con él, los headers.
                const separator = getSeparator(rowData[0], rowData[1]);
                if (!separator) {
                    rej(info);
                }
                const headers = rowData[0].split(separator);
                const headers4use = validateHeaders(headers, filetype);
                if (!headers4use) {
                    rej(info);
                }
                const h4uIndexs = headers4use.map((htarget) =>
                    headers.findIndex((h) => h === htarget)
                );
                let sheetInfo = extractSheetInfo(
                    rowData,
                    filetype,
                    h4uIndexs,
                    separator
                );
                if (!sheetInfo) rej(info);
                info.nValSheets = 1;
                info.validSheets.push(sheetInfo);
            } else {
                let workbook = XLSX.read(dataResult, {
                    type: "binary",
                });

                info.nSheets = workbook.SheetNames.length;
                workbook.SheetNames.forEach(function (sheetName) {
                    let rowData = XLSX.utils.sheet_to_json(
                        workbook.Sheets[sheetName]
                    );
                    // Si la hoja está vacia o tiene una sola fila, paso a la siguiente.
                    if (rowData.length <= 1) return;

                    // Si no, reviso sus encabezados.
                    const headers4use = validateHeaders(rowData[0], filetype);
                    if (headers4use.length === 0) return;

                    let sheetInfo = extractSheetInfo(
                        rowData,
                        filetype,
                        headers4use
                    );
                    if (!sheetInfo) return;
                    info.nValSheets++;
                    info.validSheets.push(sheetInfo);
                });
            };
            res(info);
        };
        reader.onerror = function (ex) {
            rej(Object.bind(info, { message: ex }));
        };

        reader.readAsBinaryString(rawFile);
        // reader.readAsText(rawFile);
    });
}

export default async function validateCsv(file) {
    // Se subió un archivo?
    if (!file) {
        return {
            valid: false,
            msg: "No se ha subido ningún archivo",
            data: {
                name: '',
                sheets: []
            },
        };
    }
    const name = file.name;

    // El archivo es un CSV o XLS?
    const ftIndex = getFileTypeIndex(
        file.type ? file.type : name.split(".").pop()
    );
    if (ftIndex === -1) {
        return {
            valid: false,
            msg: "El archivo no es de un tipo válido",
            data: {
                name,
                sheets: []
            },
        };
    }

    // Si es válido, procedo a leer
    let extracted = await readCSV(file, ftIndex);
    let msg = `${extracted.nSheets} hojas encontradas, ${extracted.nValSheets} con encabezados válidos`;

    if (extracted.nValSheets === 0) {
        return {
            valid: false,
            msg,
            data: {
                name,
                sheets: []
            },
        };
    }

    return {
        valid: true,
        msg,
        data: { 
            name,
            sheets: extracted.validSheets
        },
    };
}
