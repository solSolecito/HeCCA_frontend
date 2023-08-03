import JSONStream from 'JSONStream'

export function pythonConnection (csvBase = { 
    "Fecha": [ "fecha1", "fecha2" , "fecha3"],
    "Valor": [ "valor1", "valor2" , "valor3"]
}, csvComp = { }, areas = []) {
    const replacer = function(k, v) { if (v === undefined) { return null; } return v; };
    console.log("base", csvBase)
    console.log("baseJSON", JSON.stringify(csvBase.Fecha) )
    console.log("baseJSON", JSON.stringify({...csvBase}, replacer), csvBase.toString(), String(csvBase) )
    return new Promise(
        (resolve, reject) => {
            fetch(`/listas/${JSON.stringify(csvBase)}/${JSON.stringify(csvComp)}/${JSON.stringify(areas)}`)
            .then(res => { console.log(res); return res.json() }
            ).then(
              data => {
                resolve(data);
            }
            )
            .catch((error) => {
              alert("Algo fue mal!", error);
              reject({
                  error,
                  msg: "ERROR"
              });
            })
        }
    )  
}
