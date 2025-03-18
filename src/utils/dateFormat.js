const months = {
    ES: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ],
    EN: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ],
};

export function formatDate(date, lan = "ES") {
    switch (lan) {
        case "ES":
            return `${date.getDate()} de ${months[lan][date.getMonth()]} de ${date.getFullYear()}`;
        default:
            break;
    }
}
