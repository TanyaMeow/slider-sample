import React from 'react';
import './App.css';
import slides from './slides.json';
import {Slider} from "./Slider";

function App() {
    return (
        <div className="App">
            <div>
                <Slider slides={slides}
                        loop={false}
                        navs={true}
                        pags={false}
                        auto={false}
                        delay={2}
                        stopMouseHover={false}/>
            </div>
        </div>
    );
}

export default App;
