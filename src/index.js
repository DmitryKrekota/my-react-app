import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './app/App';
import IndexApp from './index_app/IndexApp';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
        <IndexApp/>
    </BrowserRouter>
    , document.getElementById('root'));

// import React from 'react'
// import { render } from 'react-dom'
// import { BrowserRouter } from 'react-router-dom'
// import App from './components/App';
//
// render((
//     <BrowserRouter>
//         <App />
//     </BrowserRouter>
// ), document.getElementById('root'));

registerServiceWorker();
