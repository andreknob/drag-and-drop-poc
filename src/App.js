import React from 'react';
import Nav from './components/nav/Nav';
import DragCorrectAnswer from './screens/dragCorrectAnswer/DragCorrectAnswer';
import Home from './screens/home/Home';
import MatchList from './screens/matchList/MatchList';
import OptionsSequencing from './screens/optionsSequencing/OptionsSequencing';
import Test from './screens/test/Test';
import Test2 from './screens/test/Test2';
import Test3 from './screens/test/Test3';
import Test4 from './screens/test/Test4';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Nav />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/drag-correct-answer" component={DragCorrectAnswer} />
                <Route path="/options-sequencing" component={OptionsSequencing} />
                <Route path="/match-list" component={MatchList} />
                <Route path="/test" component={Test} />
                <Route path="/test2" component={Test2} />
                <Route path="/test3" component={Test3} />
                <Route path="/test4" component={Test4} />
            </Switch>
        </Router>
    );
}

export default App;