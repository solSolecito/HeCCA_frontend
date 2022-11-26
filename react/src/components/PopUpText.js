import React from 'react';

export class PopUpText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: props.text ? props.text : 'Ha ocurrido un error',
            id: props.id ? props.id : 'popup-text',
            classList: props.classList ? props.classList : 'window closed'
        }
        this.close = this.close.bind(this);
    }
    render() {
        return (
            <div id={this.state.id} className={this.state.classList}>
                <div class="header-window"> 
                    <p id="btn-close-window" onClick={this.close}>x</p>
                </div>
                <p>{this.state.text}</p>
            </div>
        )
    }

    close(){
        const arrayAux = this.state.classList.split(' ');
        arrayAux.push('closed');
        this.setState({classList: arrayAux.join(' ')});
    }
}