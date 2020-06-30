import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { StreamDelete, StreamList, StreamEdit, StreamShow, StreamCreate } from './streams';
import Header from './Header';
import history from '../history';

const App = () => {
    return (
        <div className="ui container">
 {/* we use plain Router instead of BrowserRouter because we wannt to have our ownn BrowserHistory object and control it */}
            <Router history={history}>
                <div>
                    <Header />
                    {/* switch will show only 1 matched route */}
                    <Switch>
                        <Route path="/" exact component={StreamList} />
                        <Route path="/streams/new" component={StreamCreate} />
                        <Route path="/streams/edit/:id" component={StreamEdit} />
                        <Route path="/streams/delete/:id" component={StreamDelete} />
                        <Route path="/streams/:id" component={StreamShow} />
                    </Switch>
                </div>
            </Router>
        </div>
    )
}

export default App;