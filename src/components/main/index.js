import React from 'react';
import { InputSection } from './input.js';
import { PreSection } from '../preSection/index';
import { OutputSection } from '../outputSection/index';
import './styles.css';

export class Main extends React.Component {
    // Este main es una calculadora, la calculadora principal
    render() {
        return (
            <main>
                <InputSection/>
                <PreSection/>
                <OutputSection/>
            </main>
        )
    }
}