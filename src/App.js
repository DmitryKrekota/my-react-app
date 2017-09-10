import React, {Component} from 'react';
import createReactClass from 'create-react-class';
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
                <hr/>
                <div className="App-intro">
                    Hello!
                </div>
                <hr/>
                <div>
                    <HatSwitcher onHatChanged={onHatChanged}/>
                    <ThinkerWithHat hat={this.state.hat}/>
                </div>
                <hr/>
                <div>
                    <ContactsList/>
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
        Select a hat: <select onChange={(e) => onHatChanged(e.target.value)}>
            <option value="cap">Cap</option>
            <option value="pirate">Pirate</option>
            <option value="harry-potter">Harry Potter</option>
            <option value="propeller">Propeller</option>
            <option value="leprecon">Leprecon</option>
        </select>
    </div>
);

const CONTACTS = [
    {
        id: 1,
        name: 'Darth Vader',
        phoneNumber: '+250966666666',
        image: '//s2.dmcdn.net/TYguR/60x60-dfD.png'
    }, {
        id: 2,
        name: 'Princess Leia',
        phoneNumber: '+250966344466',
        image: '//s2.dmcdn.net/TYguR/60x60-dfD.png'
    }, {
        id: 3,
        name: 'Luke Skywalker',
        phoneNumber: '+250976654433',
        image: '//s2.dmcdn.net/TYguR/60x60-dfD.png'
    }, {
        id: 4,
        name: 'Chewbacca',
        phoneNumber: '+250456784935',
        image: '//s2.dmcdn.net/TYguR/60x60-dfD.png'
    }
];

const Contact = createReactClass({
    render: function() {
        return (
            <li className="contact list-group-item">
                <img className="contact-image" src={this.props.image} width="60px" height="60px" alt="user"/>
                <div className="contact-info">
                    <div className="contact-name"> {this.props.name} </div>
                    <div className="contact-number"> {this.props.phoneNumber} </div>
                </div>
            </li>
        );
    }
});

const ContactsList = createReactClass({
    getInitialState: function() {
        return {
            displayedContacts: CONTACTS
        };
    },
    handleSearch: function(event) {
        let searchQuery = event.target.value.toLowerCase();
        let displayedContacts = CONTACTS.filter(function(el) {
            let searchValue = el.name.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({
            displayedContacts: displayedContacts
        });
    },
    render: function() {
        return (
            <div className="contacts">
                <div className="input-group d-block m-x-auto">
                    <input type="text" placeholder="Search by name..." className="search-field" onChange={this.handleSearch} />
                </div>
                <br/>
                <ul className="contacts-list">
                    {
                        this.state.displayedContacts.map(function(el) {
                            return <Contact
                                key={el.id}
                                name={el.name}
                                phoneNumber={el.phoneNumber}
                                image={el.image}
                            />;
                        })
                    }
                </ul>
            </div>
        );
    }
});

export default App;
