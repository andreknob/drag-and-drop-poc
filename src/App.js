import React from 'react';
import Nav from './components/Nav';
import Home from './screens/home/Home';
import Question from './screens/question/Question';
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