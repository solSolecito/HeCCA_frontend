import React from 'react';
// import { PopUpText } from './PopUpText';

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.')
    .openPopup();

export class Output extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display:  props.outputdisplay ? props.outputdisplay : 'none',
        }
        this.show = this.show.bind(this);
    }

    /* <p><button>Buscar en Drive</button></p>
    <p>{this.state.file}</p> */

    render() {
        return (
            <section>
                <div display={this.state.display}>
                    <img className="img-full" src='../images/mock_graph.png' alt=""/>
                </div>
            </section>
        )
    }

    setDisplay (display) {
        this.setState({display:display});
    }

}