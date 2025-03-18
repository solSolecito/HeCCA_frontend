const area = [
    {
        value: 'sqmt',
        label: 'm²',
        toKm2: (n) => n * Math.pow(1 / 1000, 2)
    },
    {
        value: 'ha',
        label: 'Ha',
        toKm2: (n) => n * Math.pow(1 / 10, 2)
    },
    {
        value: 'sqkm',
        label: 'km²',
        toKm2: (n) => n
    },
    {
        value: 'sqft',
        label: 'ft²',
        toKm2: (n) => n * Math.pow(12 * 0.0000254, 2)
    },
    {
        value: 'sqmi',
        label: 'mi²',
        toKm2: (n) => n * Math.pow(1760 * 3 * 12 * 0.0000254, 2)
    }
]

const time = [
    {
        value: 'day',
        label: 'dia(s)',
        toYear: (n) => n / 365
    },
    {
        value: 'month',
        label: 'mes(es)',
        toYear: (n) => n / 12
    },
    {
        value: 'year',
        label: 'año(s)',
        toYear: (n) => n
    },
]

const flow = [
    {
        value: 'm3s',
        label: 'm³/s',
        toM3s: (n) => n 
    },
    {
        value: 'ls',
        label: 'litro/s',
        toM3s: (n) => n / 1000
    },
    {
        value: 'ft3s',
        label: 'ft³/s',
        toM3s : (n) => n * Math.pow( 12 * 0.0254, 3 )
    },
]

export { area, time, flow }