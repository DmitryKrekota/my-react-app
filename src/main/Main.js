import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from '../home/Home';
import About from '../about/About';
import UndoRedo from '../undo-redo/UndoRedo';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/about' component={About}/>
            <Route path='/undo-redo' component={UndoRedo}/>
        </Switch>
    </main>
);

export default Main;
