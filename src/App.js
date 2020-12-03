import React from 'react';
import Nav from './components/Nav';
import Home from './screens/Home';
import Question from './screens/Question';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/question" component={Question} />
            </Switch>
        </Router>
    );
}

export default App;