import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {hat: 'cap'}
    }

    render() {
        const onHatChanged = (hat) => {
            this.setState({hat});
        };
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome to React</h2>
                </div>
                <p className="App-intro">
                    Hello!
                </p>
                <hr/>
                <div>
                    <HatSwitcher onHatChanged={onHatChanged}/>
                    <ThinkerWithHat hat={this.state.hat}/>
                </div>
            </div>
        );
    }
}

const Hat = ({type}) => {
    let url = '';
    switch (type) {
        case 'cap':
            url = '//i.imgur.com/98qjQGt.png';
            break;
        case 'pirate':
            url = '//i.imgur.com/c2Pt5t0.png';
            break;
        case 'harry-potter':
            url = '//i.imgur.com/WUgXevl.png';
            break;
        case 'propeller':
            url = '//i.imgur.com/tAoaDqe.png';
            break;
        case 'leprecon':
            url = '//i.imgur.com/vFBUhG4.png';
            break;
        default :
            url = '';
            break;
    }
    return <img src={url} alt="hat" className="hat"/>
};

const Thinker = () => (
    <img className="thinker" alt="thinker" src="//i.imgur.com/WVhCgi2.png"/>
);

const ThinkerWithHat = ({hat}) => (
    <div className="thinker-container">
        <Thinker />
        <Hat type={hat}/>
    </div>
);

const HatSwitcher = ({onHatChanged}) => (
    <div>
        Select a hat:
        <select onChange={(e) => onHatChanged(e.target.value)}>
            <option value="cap">Cap</option>
            <option value="pirate">Pirate</option>
            <option value="harry-potter">Harry Potter</option>
            <option value="propeller">Propeller</option>
            <option value="leprecon">Leprecon</option>
        </select>
    </div>
);

export default App;
