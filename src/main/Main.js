import React from 'react'
import { Switch, Route } from 'react-router-dom'
import App from '../app/App'
import About from '../about/About'

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route path='/about' component={About}/>
        </Switch>
    </main>
);

export default Main;
