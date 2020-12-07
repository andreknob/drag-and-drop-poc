import React from 'react';
import Nav from './components/Nav';
import Home from './screens/home/Home';
import DragCorrectAnswer from './screens/dragCorrectAnswer/DragCorrectAnswer';
import OptionsSequencing from './screens/optionsSequencing/OptionsSequencing';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/drag-correct-answer" component={DragCorrectAnswer} />
                <Route path="/options-sequencing" component={OptionsSequencing} />
            </Switch>
        </Router>
    );
}

export default App;