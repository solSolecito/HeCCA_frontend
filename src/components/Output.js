import React from 'react';
import { PopUpText } from './PopUpText';

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
                    <img class="img-full" src='../../images/mock_graph.png'/>
                </div>
            </section>
        )
    }

    setDisplay (display) {
        this.setState({display:display});
    }

}