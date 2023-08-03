import React from 'react';
// import { PopUpText } from './PopUpText';

/* var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup(); */

export function Output(props) {
    return (
        <section>
            <div display={props.display}>
                <img className="img-full" id="map-location" src='../images/mock_graph.png' alt="" />
            </div>
            <div display={props.display}>
                <img className="img-full" id="img-series" src='../images/mock_graph.png' alt="" />
            </div>
            <div display={props.display}>
                <img className="img-full" id="img-umbrales" src='../images/mock_graph.png' alt="" />
            </div>
        </section>
    )
}

function setDisplay(display) {
   return ({ display: display });
}