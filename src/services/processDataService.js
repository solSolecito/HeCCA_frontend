import React from 'react';
import Papa from "papaparse";

// Allowed extensions for input file
const allowedExtensions = ["csv"];

export async function processDataService(csvBase, csvAlt = {}, areaBase = 0, areaAlt = 0, qb = 0, qtq = 0) {
    // Lee el csv
    // This state will store the parsed data
    let data = [];

    if (!csvBase) return "Enter a valid file";

    // Initialize a reader which allows user
    // to read any file or blob.
    const reader = new FileReader();

    // Event listener on reader when the file
    // loads, we parse it and set the data.
    reader.onload = async ({ target }) => {
        const csv = Papa.parse(target.result, { header: true });
        const parsedData = csv?.data;
        const columns = Object.keys(parsedData[0]);
        data = columns;
        return {
            coords: {
                lat: parsedData[0].Latitud,
                lon: parsedData[0].Longitud
            }
        }
    };
    reader.readAsText(csvBase);
};